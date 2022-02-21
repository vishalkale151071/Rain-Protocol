// SPDX-License-Identifier: CAL
pragma solidity ^0.8.10;

import {RainVM, State} from "../vm/RainVM.sol";
import {VMState, StateConfig} from "../vm/libraries/VMState.sol";
import {LogicOps} from "../vm/ops/LogicOps.sol";

/// @title LogicTest
/// Simple contract that exposes logic ops for testing.
contract LogicTest is RainVM, VMState {
    uint256 private immutable logicOpsStart;
    address private immutable vmStatePointer;

    constructor(StateConfig memory config_) {
        /// These local opcode offsets are calculated as immutable but are
        /// really just compile time constants. They only depend on the
        /// imported libraries and contracts. These are calculated at
        /// construction to future-proof against underlying ops being
        /// added/removed and potentially breaking the offsets here.
        logicOpsStart = RainVM.OPS_LENGTH;
        vmStatePointer = _snapshot(_newState(RainVM(this), config_));
    }

    /// @inheritdoc RainVM
    function stackIndexDiff(uint256 opcode_, uint256 operand_)
        public
        view
        virtual
        override
        returns (int256)
    {
        unchecked {
            return LogicOps.stackIndexDiff(opcode_ - logicOpsStart, operand_);
        }
    }

    /// @inheritdoc RainVM
    function applyOp(
        bytes memory context_,
        uint256 stackTopLocation_,
        uint256 opcode_,
        uint256 operand_
    ) internal view override returns (uint256) {
        unchecked {
            return
                LogicOps.applyOp(
                    context_,
                    stackTopLocation_,
                    opcode_ - logicOpsStart,
                    operand_
                );
        }
    }

    /// Wraps `runState` and returns top of stack.
    /// @return top of `runState` stack.
    function run() external view returns (uint256) {
        State memory state_ = runState();
        return state_.stack[state_.stackIndex - 1];
    }

    /// Runs `eval` and returns full state.
    /// @return `State` after running own immutable source.
    function runState() public view returns (State memory) {
        State memory state_ = _restore(vmStatePointer);
        eval("", state_, 0);
        return state_;
    }
}
