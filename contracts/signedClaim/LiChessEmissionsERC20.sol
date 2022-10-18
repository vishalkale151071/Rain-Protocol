// SPDX-License-Identifier: CAL
pragma solidity =0.8.15;

import "../tier/libraries/TierConstants.sol";
import {ERC20Config} from "../erc20/ERC20Config.sol";
import "./LiChessIClaim.sol";
import "../tier/TierV2.sol";
import "../tier/libraries/TierReport.sol";
import {RainVMIntegrity, StateConfig} from "../vm/integrity/RainVMIntegrity.sol";
import "../vm/runtime/StandardVM.sol";
import {AllStandardOps} from "../vm/ops/AllStandardOps.sol";
import {ERC20Upgradeable as ERC20} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "../sstore2/SSTORE2.sol";
import "../array/LibUint256Array.sol";

/// Constructor config.
/// @param allowDelegatedClaims True if accounts can call `claim` on behalf of
/// another account.
/// @param Constructor config for the ERC20 token minted according to emissions
/// schedule in `claim`.
/// @param Constructor config for the `ImmutableSource` that defines the
/// emissions schedule for claiming.
struct EmissionsERC20Config {
    bool allowDelegatedClaims;
    ERC20Config erc20Config;
    StateConfig vmStateConfig;
}

struct ClaimContext {
    address claimant;
    GameData gamedata;
}

library LibClaimContext {
    function toContext(ClaimContext memory claimContext_) internal view returns(uint256[] memory _context){
        _context = new uint256[](8);
        _context[0] = uint256(uint160(claimContext_.claimant));
        _context[1] = claimContext_.gamedata.timeStamp;
        _context[2] = uint256(uint160(claimContext_.gamedata.whiteAddress));
        _context[3] = uint256(uint160(claimContext_.gamedata.blackAddress));
        _context[4] = claimContext_.gamedata.whiteResult;
        _context[5] = claimContext_.gamedata.blackResult;
        _context[6] = claimContext_.gamedata.whiteElo;
        _context[7] = claimContext_.gamedata.blackElo;
    }
}

/// @title EmissionsERC20
/// @notice Mints itself according to some predefined schedule. The schedule is
/// expressed as a rainVM script and the `claim` function is world-callable.
/// Intended behaviour is to avoid sybils infinitely minting by putting the
/// claim functionality behind a `TierV2` contract. The emissions contract
/// itself implements `ReadOnlyTier` and every time a claim is processed it
/// logs the block number of the claim against every tier claimed. So the block
/// numbers in the tier report for `EmissionsERC20` are the last time that tier
/// was claimed against this contract. The simplest way to make use of this
/// information is to take the max block for the underlying tier and the last
/// claim and then diff it against the current block number.
/// See `test/Claim/EmissionsERC20.sol.ts` for examples, including providing
/// staggered rewards where more tokens are minted for higher tier accounts.
contract LiChessEmissionsERC20 is TierV2, StandardVM, ERC20, LiChessIClaim {
    using LibStackTop for uint256[];
    using LibStackTop for StackTop;
    using LibUint256Array for uint256;
    using LibVMState for VMState;
    using LibClaimContext for ClaimContext;

    /// Contract has initialized.
    /// @param sender `msg.sender` initializing the contract (factory).
    /// @param config All initialized config.
    event Initialize(address sender, EmissionsERC20Config config);

    /// Whether the claimant must be the caller of `claim`. If `false` then
    /// accounts other than claimant can claim. This may or may not be
    /// desirable depending on the emissions schedule. For example, a linear
    /// schedule will produce the same end result for the claimant regardless
    /// of who calls `claim` or when but an exponential schedule is more
    /// profitable if the claimant waits longer between claims. In the
    /// non-linear case delegated claims would be inappropriate as third
    /// party accounts could grief claimants by claiming "early", thus forcing
    /// opportunity cost on claimants who would have preferred to wait.
    bool public allowDelegatedClaims;

    /// Each claim is modelled as a report so that the claim report can be
    /// diffed against the upstream report from a tier based emission scheme.
    mapping(address => uint256) private reports;

    constructor(address vmIntegrity_) StandardVM(vmIntegrity_) {
        _disableInitializers();
    }

    /// @param config_ source and token config. Also controls delegated claims.
    function initialize(EmissionsERC20Config calldata config_)
        external
        initializer
    {
        __TierV2_init();
        __ERC20_init(config_.erc20Config.name, config_.erc20Config.symbol);
        _mint(
            config_.erc20Config.distributor,
            config_.erc20Config.initialSupply
        );

        _saveVMState(config_.vmStateConfig);

        /// Log some deploy state for use by claim/opcodes.
        allowDelegatedClaims = config_.allowDelegatedClaims;

        emit Initialize(msg.sender, config_);
    }

    /// @inheritdoc ITierV2
    function report(address account_, uint256[] memory)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return reports[account_];
    }

    /// @inheritdoc ITierV2
    function reportTimeForTier(
        address account_,
        uint256 tier_,
        uint256[] calldata
    ) external view returns (uint256) {
        return TierReport.reportTimeForTier(reports[account_], tier_);
    }

    /// Calculates the claim without processing it.
    /// Read only method that may be useful downstream both onchain and
    /// offchain if a claimant wants to check the claim amount before deciding
    /// whether to process it.
    /// As this is read only there are no checks against delegated claims. It
    /// is possible to return a value from `calculateClaim` and to not be able
    /// to process the claim with `claim` if `msg.sender` is not the
    /// `claimant_`.
    /// @param claimant_ Address to calculate current claim for.
    function calculateClaim(address claimant_, GameData memory context_) public view returns (uint256) {
        return
            _loadVMState(ClaimContext(claimant_, context_).toContext()).eval().peek();
    }

    /// Processes the claim for `claimant_`.
    /// - Enforces `allowDelegatedClaims` if it is `true` so that `msg.sender`
    /// must also be `claimant_`.
    /// - Takes the return from `calculateClaim` and mints for `claimant_`.
    /// - Records the current block as the claim-tier for this contract.
    /// - emits a `Claim` event as per `IClaim`.
    /// @param claimant_ address receiving minted tokens. MUST be `msg.sender`
    /// if `allowDelegatedClaims` is `false`.
    /// @param data_ NOT used onchain. Forwarded to `Claim` event for potential
    /// additional offchain processing.
    /// @inheritdoc LiChessIClaim
    function claim(address claimant_, GameData memory context_, bytes calldata data_) external {
        // Disallow delegated claims if appropriate.
        if (!allowDelegatedClaims) {
            require(msg.sender == claimant_, "DELEGATED_CLAIM");
        }

        // Mint the claim.
        uint256 amount_ = calculateClaim(claimant_, context_);
        _mint(claimant_, amount_);

        // Record the current block as the latest claim.
        // This can be diffed/combined with external reports in future claim
        // calculations.
        reports[claimant_] = TierReport.updateTimesForTierRange(
            TierConstants.NEVER_REPORT,
            TierConstants.TIER_ZERO,
            TierConstants.TIER_EIGHT,
            block.timestamp
        );
        emit Claim(msg.sender, claimant_, data_);
    }
}
