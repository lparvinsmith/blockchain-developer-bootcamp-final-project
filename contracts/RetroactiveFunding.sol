// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/// @title A Retroactive Funding DAO
/// @author Lara Parvinsmith
/// @notice You can use this contract to setup and govern a DAO
/// where funders receive an NFT that lets them vote on a project candidate
/// @dev Everything should be public except for function payoutWinner
contract RetroactiveFunding is AccessControl, ERC721Enumerable {

    bytes32 public constant _admins = DEFAULT_ADMIN_ROLE;

    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    address public owner = msg.sender;
    uint256 public buyin;

    bool public voterRegistrationOpen = true;
    bool public projectSubmissionOpen = true;
    bool public votingOpen = false;

    mapping(uint256 => bool) public tokenVoted;
    mapping(address => uint256) public candidates;
    uint256 public tokenVoteCount;
    uint256 public mostVotes;
    address payable public currentWinner;

    constructor (string memory name, string memory symbol, uint256 initBuyin) ERC721(name, symbol)   {
        _setupRole(_admins, owner);
        setBuyin(initBuyin);
    }

    /// @dev overrides shared function inherited from both contracts
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "is not owner");
        _;
    }

    /// @notice validates whether user has Admin role
    /// @dev uses AcessControl hasRole
    modifier onlyAdmin() {
        require(hasRole(_admins, msg.sender), "does not have admin role");
        _;
    }

    event VoterRegistered(address voterAddress, uint256 contractBalance);

    event CandidateRegistered(address candidateAddress);

    event WeHaveAWinner(address winnerAddress, uint256 totalWinnings);

    /// @notice allows contract to receive ether
    /// @dev function is executed on a call to the contract with empty calldata
    receive() external payable {}

    /// @notice revert transaction and refund remaining gas
    /// @dev Fallback function is executed on a call to the contract
    /// if none of the other functions match the given function signature
    fallback() external payable {
        revert();
    }

    // ADMIN

    /// @notice allows owner to grant other users admin privileges
    /// @dev uses AccessControl grantRole function
    /// @param addresses list of user's addresses to become admin
    function setAdmin(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; ++i) {
            grantRole(_admins, addresses[i]);
        }
    }

    /// @notice allows admin to change buyin
    /// @param amount in wei
    function setBuyin(uint256 amount) public onlyAdmin {
        require(amount > 0, "buyin must be greater than 0");
        buyin = amount;
    }

    /// @notice allows admin to set voterRegistrationOpen
    function setVoterRegistrationOpen() public onlyAdmin {
        voterRegistrationOpen = true;
    }

    /// @notice allows admin to set voterRegistrationOpen
    function setVoterRegistrationClosed() public onlyAdmin {
        voterRegistrationOpen = false;
    }

    /// @notice allows admin to set projectSubmissionOpen
    function setProjectSubmissionOpen() public onlyAdmin {
        projectSubmissionOpen = true;
    }

    /// @notice allows admin to set projectSubmissionOpen
    function setProjectSubmissionClosed() public onlyAdmin {
        projectSubmissionOpen = false;
    }

    /// @notice allows admin to set votingOpen
    function setVotingOpen() public onlyAdmin {
        votingOpen = true;
    }

    /// @notice allow admin to trigger payout
    /// only allow if certain amount of time has passed
    /// necessary if some registerd voters are no shows
    /// @dev TODO
    function setVotingClosed() public onlyAdmin {}

    // VOTERS

    /// @notice allows a user to buyin and mint voter NFT
    /// @dev uses ERC721 to _mint an NFT and send to user
    /// and Countable to increment _tokenIds
    function registerVoter() public payable {
        require(voterRegistrationOpen, 'voter registration not open');
        require(msg.value >= buyin, "value must not be less than buyin");
        require(balanceOf(msg.sender) == 0, 'must not be registered already');

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        emit VoterRegistered(msg.sender, address(this).balance);
    }

    /// @notice allows a user with a token to vote on one candidate
    /// @dev uses ERC721 balanceOf to determine whether user has token
    /// and ERC721Enumerable to get tokenId via tokenOfOwnerByIndex
    /// to add to tokenVoted mapping to enforce 1 vote per token.
    /// @param candidateAddress is the address user wants to vote for
    function vote(address payable candidateAddress) public {
        require(votingOpen, 'voting is not open');
        require(balanceOf(msg.sender) > 0, 'must have token to vote');
        require(!tokenVoted[tokenOfOwnerByIndex(msg.sender, 0)], 'must not have used token to vote already');
        
        candidates[candidateAddress] = candidates[candidateAddress] + 1;
        tokenVoteCount = tokenVoteCount + 1;
        
        if (candidates[candidateAddress] > mostVotes) {
            mostVotes = candidates[candidateAddress];
            currentWinner = candidateAddress;
        }

        // enforce 1 vote per token
        tokenVoted[tokenOfOwnerByIndex(msg.sender, 0)] = true;

        // if all token holders voted, payout winner
        if(!voterRegistrationOpen && totalSupply() == tokenVoteCount) {
            payoutWinner();
        }
    }

    // CANDIDATES

    /// @notice allows a user to register as candidate, starts vote count at 1
    function registerCandidate() public {
        require(projectSubmissionOpen, 'project submission not open');
        require(candidates[msg.sender] == 0, "candidate already registered");
        candidates[msg.sender] = 1;
        emit CandidateRegistered(msg.sender);
    }

    // PRIVATE

    /// @notice triggers winner announcement and payout.
    /// the whole contract balance is transfered.
    /// deployed contract may be used again for a new round, or discarded
    function payoutWinner() private {
        emit WeHaveAWinner(currentWinner, address(this).balance);
        currentWinner.transfer(address(this).balance);
    }
}
