// SPDX-License-Identifier: CAL
pragma solidity =0.8.18;

import {ReentrancyGuardUpgradeable as ReentrancyGuard} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {ERC1155Upgradeable as ERC1155} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {ERC1155ReceiverUpgradeable as ERC1155Receiver} from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import "rain.interface.interpreter/LibEncodedDispatch.sol";
import "rain.interface.factory/ICloneableV1.sol";
import "sol.lib.memory/LibUint256Matrix.sol";
import "rain.interface.flow/IFlowERC1155V2.sol";

import "../../sentinel/LibSentinel.sol";
import "../libraries/LibFlow.sol";
import "../FlowCommon.sol";

/// Thrown when eval of the transfer entrypoint returns 0.
error InvalidTransfer();

uint256 constant RAIN_FLOW_ERC1155_SENTINEL = uint256(
    keccak256(bytes("RAIN_FLOW_ERC1155_SENTINEL")) | SENTINEL_HIGH_BITS
);

bytes32 constant CALLER_META_HASH = bytes32(
    0x05383d9a90b702ee4773fd3e90a9b51ce8b57e354e9c672bc7c9567657a2f0ba
);

SourceIndex constant CAN_TRANSFER_ENTRYPOINT = SourceIndex.wrap(0);
uint256 constant CAN_TRANSFER_MIN_OUTPUTS = 1;
uint16 constant CAN_TRANSFER_MAX_OUTPUTS = 1;

uint256 constant FLOW_ERC1155_MIN_OUTPUTS = MIN_FLOW_SENTINELS + 2;

contract FlowERC1155 is ICloneableV1, IFlowERC1155V2, ReentrancyGuard, FlowCommon, ERC1155 {
    using LibStackPointer for StackPointer;
    using LibStackPointer for uint256[];
    using LibUint256Array for uint256;
    using LibUint256Array for uint256[];
    using LibUint256Matrix for uint256[];

    Evaluable internal evaluable;

    constructor(
        DeployerDiscoverableMetaV1ConstructionConfig memory config_
    ) FlowCommon(CALLER_META_HASH, config_) {}

    /// @inheritdoc ICloneableV1
    function initialize(bytes calldata data_) external initializer {
        FlowERC1155Config memory config_ = abi.decode(
            data_,
            (FlowERC1155Config)
        );
        emit Initialize(msg.sender, config_);
        __ReentrancyGuard_init();
        __ERC1155_init(config_.uri);

        (
            IInterpreterV1 interpreter_,
            IInterpreterStoreV1 store_,
            address expression_
        ) = config_.evaluableConfig.deployer.deployExpression(
                config_.evaluableConfig.sources,
                config_.evaluableConfig.constants,
                LibUint256Array.arrayFrom(CAN_TRANSFER_MIN_OUTPUTS)
            );
        evaluable = Evaluable(interpreter_, store_, expression_);

        flowCommonInit(config_.flowConfig, FLOW_ERC1155_MIN_OUTPUTS);
    }

    function _dispatch(
        address expression_
    ) internal pure returns (EncodedDispatch) {
        return
            LibEncodedDispatch.encode(
                expression_,
                CAN_TRANSFER_ENTRYPOINT,
                CAN_TRANSFER_MAX_OUTPUTS
            );
    }

    /// Needed here to fix Open Zeppelin implementing `supportsInterface` on
    /// multiple base contracts.
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// @inheritdoc ERC1155
    function _afterTokenTransfer(
        address operator_,
        address from_,
        address to_,
        uint256[] memory ids_,
        uint256[] memory amounts_,
        bytes memory data_
    ) internal virtual override {
        unchecked {
            super._afterTokenTransfer(
                operator_,
                from_,
                to_,
                ids_,
                amounts_,
                data_
            );
            // Mint and burn access MUST be handled by flow.
            // CAN_TRANSFER will only restrict subsequent transfers.
            if (!(from_ == address(0) || to_ == address(0))) {
                Evaluable memory evaluable_ = evaluable;

                for (uint256 i_ = 0; i_ < ids_.length; i_++) {
                    uint256[][] memory context_;
                    {
                        context_ = LibContext.build(
                            // Transfer params are caller context.
                            LibUint256Array.arrayFrom(
                                uint(uint160(operator_)),
                                uint256(uint160(from_)),
                                uint256(uint160(to_)),
                                ids_[i_],
                                amounts_[i_]
                            ).matrixFrom(),
                            new SignedContextV1[](0)
                        );
                    }
                    (
                        uint256[] memory stack_,
                        uint256[] memory kvs_
                    ) = evaluable_.interpreter.eval(
                            evaluable_.store,
                            DEFAULT_STATE_NAMESPACE,
                            _dispatch(evaluable_.expression),
                            context_
                        );
                    if (stack_[stack_.length - 1] == 0) {
                        revert InvalidTransfer();
                    }
                    if (kvs_.length > 0) {
                        evaluable_.store.set(DEFAULT_STATE_NAMESPACE, kvs_);
                    }
                }
            }
        }
    }

    function _previewFlow(
        Evaluable memory evaluable_,
        uint256[][] memory context_
    ) internal view returns (FlowERC1155IO memory, uint256[] memory) {
        uint256[] memory refs_;
        FlowERC1155IO memory flowIO_;
        (
            StackPointer stackBottom_,
            StackPointer stackTop_,
            uint256[] memory kvs_
        ) = flowStack(evaluable_, context_);
        (stackTop_, refs_) = stackTop_.consumeStructs(
            stackBottom_,
            RAIN_FLOW_ERC1155_SENTINEL,
            3
        );
        assembly ("memory-safe") {
            mstore(flowIO_, refs_)
        }
        (stackTop_, refs_) = stackTop_.consumeStructs(
            stackBottom_,
            RAIN_FLOW_ERC1155_SENTINEL,
            3
        );
        assembly ("memory-safe") {
            mstore(add(flowIO_, 0x20), refs_)
        }
        flowIO_.flow = LibFlow.stackToFlow(stackBottom_, stackTop_);
        return (flowIO_, kvs_);
    }

    function _flow(
        Evaluable memory evaluable_,
        uint256[] memory callerContext_,
        SignedContextV1[] memory signedContexts_
    ) internal virtual nonReentrant returns (FlowERC1155IO memory) {
        unchecked {
            uint256[][] memory context_ = LibContext.build(
                callerContext_.matrixFrom(),
                signedContexts_
            );
            emit Context(msg.sender, context_);
            (
                FlowERC1155IO memory flowIO_,
                uint256[] memory kvs_
            ) = _previewFlow(evaluable_, context_);
            for (uint256 i_ = 0; i_ < flowIO_.mints.length; i_++) {
                // @todo support data somehow.
                _mint(
                    flowIO_.mints[i_].account,
                    flowIO_.mints[i_].id,
                    flowIO_.mints[i_].amount,
                    ""
                );
            }
            for (uint256 i_ = 0; i_ < flowIO_.burns.length; i_++) {
                _burn(
                    flowIO_.burns[i_].account,
                    flowIO_.burns[i_].id,
                    flowIO_.burns[i_].amount
                );
            }
            LibFlow.flow(flowIO_.flow, evaluable_.store, kvs_);
            return flowIO_;
        }
    }

    function previewFlow(
        Evaluable memory evaluable_,
        uint256[] memory callerContext_,
        SignedContextV1[] memory signedContexts_
    ) external view virtual returns (FlowERC1155IO memory) {
        uint256[][] memory context_ = LibContext.build(
            callerContext_.matrixFrom(),
            signedContexts_
        );
        (FlowERC1155IO memory flowERC1155IO_, ) = _previewFlow(
            evaluable_,
            context_
        );
        return flowERC1155IO_;
    }

    function flow(
        Evaluable memory evaluable_,
        uint256[] memory callerContext_,
        SignedContextV1[] memory signedContexts_
    ) external payable virtual returns (FlowERC1155IO memory) {
        return _flow(evaluable_, callerContext_, signedContexts_);
    }
}
