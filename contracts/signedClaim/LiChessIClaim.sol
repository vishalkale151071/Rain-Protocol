// SPDX-License-Identifier: CAL
pragma solidity ^0.8.0;

struct GameData {
    uint256 timeStamp;
    address whiteAddress;
    address blackAddress;
    uint256 whiteResult;
    uint256 blackResult;
    uint256 whiteElo;
    uint256 blackElo;
}

/// @title IClaim
/// @notice Embodies the idea of processing a claim for some kind of reward.
interface LiChessIClaim {
    /// `Claim` is emitted whenever `claim` is called to signify that the claim
    /// has been processed. Makes no assumptions about what is being claimed,
    /// not even requiring an "amount" or similar. Instead there is a generic
    /// `data` field where contextual information can be logged for offchain
    /// processing.
    /// @param sender `msg.sender` authorizing the claim.
    /// @param claimant_ the data of game from LiChess API.
    /// @param data Associated data for the claim call.
    event Claim(address sender, address claimant_, bytes data);

    /// Process a claim for `claimant`.
    /// It is up to the implementing contract to define what a "claim" is, but
    /// broadly it is expected to be some kind of reward.
    /// Implementing contracts MAY allow addresses other than `claimant` to
    /// process a claim but be careful if doing so to avoid griefing!
    /// Implementing contracts MAY allow `claim` to be called arbitrarily many
    /// times, or restrict themselves to a single or several calls only.
    /// @param context_ the data of game from LiChess API.
    function claim(address claimant_ ,GameData memory context_, bytes calldata data) external;
}
