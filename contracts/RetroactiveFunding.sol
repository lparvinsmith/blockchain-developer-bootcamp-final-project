// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract RetroactiveFunding is AccessControl, ERC721Enumerable {

    bytes32 public constant _admins = DEFAULT_ADMIN_ROLE;
    bytes32 public constant _voters = keccak256("_voters");

    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    address public owner = msg.sender;
    uint256 public buyin;

    bool public voterRegistrationOpen = true;
    bool public projectSubmissionOpen = true;
    bool public votingOpen = false;

    mapping(uint256 => bool) public tokenVoted;
    mapping(address => uint256) public candidates;
    uint256 public mostVotes;
    address payable public currentWinner;

    constructor (string memory name, string memory symbol, uint256 initBuyin) ERC721(name, symbol)   {
        _setupRole(_admins, owner);
        setBuyin(initBuyin);
    }

    // override shared function
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "is not owner");
        _;
    }

    modifier onlyAdmin() {
        require(hasRole(_admins, msg.sender), "does not have admin role");
        _;
    }

    // ADMIN
    function setAdmin(address[] calldata addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; ++i) {
            grantRole(_admins, addresses[i]);
        }
    }

    function setBuyin(uint256 amount) public onlyAdmin {
        require(amount > 0, "buyin must be greater than 0");
        buyin = amount;
    }

    function setVoterRegistrationOpen() public onlyAdmin {
        voterRegistrationOpen = true;
    }

    function setVoterRegistrationClosed() public onlyAdmin {
        voterRegistrationOpen = false;
    }

    function setProjectSubmissionOpen() public onlyAdmin {
        projectSubmissionOpen = true;
    }

    function setProjectSubmissionClosed() public onlyAdmin {
        projectSubmissionOpen = false;
    }

    function setVotingOpen() public onlyAdmin {
        votingOpen = true;
    }

    // only allow if certain amount of time has passed
    // necessary if some registerd voters are no shows
    function setVotingClosed() public onlyAdmin {}

    // VOTERS
    function registerVoter() public payable {
        require(voterRegistrationOpen, 'voter registration not open');
        require(msg.value >= buyin, "value must not be less than buyin");
        require(balanceOf(msg.sender) == 0, 'must not be registered already');

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
    }

    function vote(address payable candidateAddress) public {
        require(votingOpen, 'voting is not open');
        require(balanceOf(msg.sender) > 0, 'must have token to vote');
        require(!tokenVoted[tokenOfOwnerByIndex(msg.sender, 0)], 'must not have used token to vote already');
        
        candidates[candidateAddress] = candidates[candidateAddress] + 1;
        
        if (candidates[candidateAddress] > mostVotes) {
            mostVotes = candidates[candidateAddress];
            currentWinner = candidateAddress;
        }

        // enforece 1 vote per token - take away ability to vote
        tokenVoted[tokenOfOwnerByIndex(msg.sender, 0)] = true;

        // if total votes == amount of voters, payoutWinner
        

        // TODO when does voting end?
        // 1. when admin closes voting,
        // 2. count total number of voters and votes
    }

    // CANDIDATES
    function registerCandidate() public {
        require(projectSubmissionOpen, 'project submission not open');
        require(candidates[msg.sender] == 0, "candidate already registered");
        candidates[msg.sender] = 1;
    }

    // PRIVATE
    function payoutWinner() private  {
        currentWinner.transfer(address(this).balance);
    }
}
