// SPDX-License-Identifier: CAL
pragma solidity =0.8.17;

import {Factory} from "../../factory/Factory.sol";
import {FlowCommonConstructionConfig} from "../FlowCommon.sol";
import {Flow, FlowConfig} from "./Flow.sol";
import {ClonesUpgradeable as Clones} from "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import {LibInterpreterState} from "../../interpreter/run/LibInterpreterState.sol";
import {EvaluableConfig} from "../../interpreter/run/LibEvaluable.sol";

/// @title FlowFactory
/// @notice Factory for deploying and registering `Flow` contracts.
contract FlowFactory is Factory {
    /// Template contract to clone.
    /// Deployed by the constructor.
    address public immutable implementation;

    /// Build the reference implementation to clone for each child.
    constructor(FlowCommonConstructionConfig memory config_) {
        address implementation_ = address(new Flow(config_));
        emit Implementation(msg.sender, implementation_);
        implementation = implementation_;
    }

    /// @inheritdoc Factory
    function _createChild(
        bytes memory data_
    ) internal virtual override returns (address) {
        FlowConfig memory config_ = abi.decode(data_, (FlowConfig));
        address clone_ = Clones.clone(implementation);
        Flow(payable(clone_)).initialize(config_);
        return clone_;
    }

    /// Allows calling `createChild` with `FlowConfig` struct.
    /// Use original `Factory` `createChild` function signature if function
    /// parameters are already encoded.
    ///
    /// @param config_ `Flow` constructor configuration.
    /// @return New `Flow` child contract address.
    function createChildTyped(
        FlowConfig memory config_
    ) external returns (Flow) {
        return Flow(payable(createChild(abi.encode(config_))));
    }
}
