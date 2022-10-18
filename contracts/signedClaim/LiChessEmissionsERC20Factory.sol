// SPDX-License-Identifier: CAL
pragma solidity =0.8.15;

import {Factory} from "../factory/Factory.sol";
import {LiChessEmissionsERC20, EmissionsERC20Config} from "./LiChessEmissionsERC20.sol";
import {ClonesUpgradeable as Clones} from "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";

/// @title EmissionsERC20Factory
/// @notice Factory for deploying and registering `EmissionsERC20` contracts.
contract LiChessEmissionsERC20Factory is Factory {
    /// Template contract to clone.
    /// Deployed by the constructor.
    address public immutable implementation;

    /// Build the reference implementation to clone for each child.
    constructor(address vmIntegrity_) {
        address implementation_ = address(new LiChessEmissionsERC20(vmIntegrity_));
        emit Implementation(msg.sender, implementation_);
        implementation = implementation_;
    }

    /// @inheritdoc Factory
    function _createChild(bytes memory data_)
        internal
        virtual
        override
        returns (address)
    {
        EmissionsERC20Config memory config_ = abi.decode(
            data_,
            (EmissionsERC20Config)
        );
        address clone_ = Clones.clone(implementation);
        LiChessEmissionsERC20(clone_).initialize(config_);
        return clone_;
    }

    /// Allows calling `createChild` with `EmissionsERC20Config` struct.
    /// Use original `Factory` `createChild` function signature if function
    /// parameters are already encoded.
    ///
    /// @param config_ `EmissionsERC20` constructor configuration.
    /// @return New `EmissionsERC20` child contract address.
    function createChildTyped(EmissionsERC20Config memory config_)
        external
        returns (LiChessEmissionsERC20)
    {
        return LiChessEmissionsERC20(createChild(abi.encode(config_)));
    }
}
