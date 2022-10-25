// SPDX-License-Identifier: CAL
pragma solidity =0.8.17;

import "../FlowCommon.sol";
import "../libraries/LibFlow.sol";
import {ReentrancyGuardUpgradeable as ReentrancyGuard} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract Flow is ReentrancyGuard, FlowCommon {
    using LibInterpreterState for InterpreterState;

    event Initialize(address sender, FlowCommonConfig config);

    /// flow index => id => time
    mapping(SourceIndex => mapping(uint256 => uint256)) private _flows;

    /// @param config_ allowed flows set at initialization.
    function initialize(FlowCommonConfig calldata config_)
        external
        initializer
    {
        __FlowCommon_init(config_);
        emit Initialize(msg.sender, config_);
    }

    function _previewFlow(
        InterpreterState memory state_,
        SignedContext[] memory signedContexts_
    ) internal view returns (FlowTransfer memory) {
        StackTop stackTop_ = flowStack(state_, signedContexts_);
        return LibFlow.stackToFlow(state_.stackBottom, stackTop_);
    }

    function previewFlow(
        uint256 flow_,
        uint256 id_,
        SignedContext[] memory signedContexts_
    ) external view virtual returns (FlowTransfer memory) {
        return _previewFlow(_loadFlowState(flow_, id_), signedContexts_);
    }

    function flow(
        uint256 flow_,
        uint256 id_,
        SignedContext[] memory signedContexts_
    ) external payable virtual nonReentrant returns (FlowTransfer memory) {
        InterpreterState memory state_ = _loadFlowState(flow_, id_);
        FlowTransfer memory flowTransfer_ = _previewFlow(
            state_,
            signedContexts_
        );
        registerFlowTime(
            IdempotentFlag.wrap(state_.contextScratch),
            flow_,
            id_
        );
        return LibFlow.flow(flowTransfer_, address(this), payable(msg.sender));
    }
}
