// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RetroactiveFunding is AccessControlEnumerable, ERC721 {

    bytes32 public constant _admins = DEFAULT_ADMIN_ROLE;
    bytes32 public constant _voters = keccak256("_voters");

    address public owner = msg.sender;
    uint256 public buyin;

    bool public voterRegistrationOpen = true;
    bool public projectSubmissionOpen = true;
    bool public votingOpen = false;

    mapping(address => uint256) public candidates;
    uint256 mostVotes;
    address payable currentWinner;

    constructor (string memory name, string memory symbol) ERC721(name, symbol)   {
        _setupRole(_admins, owner);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControlEnumerable) returns (bool) {
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

    modifier onlyVoter() {
        require(hasRole(_voters, msg.sender), "does not have voter role");
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
        require(
            !projectSubmissionOpen && !voterRegistrationOpen,
            "voter registration and project submission must not be open"
        );
        votingOpen = true;
    }

    // only allow if certain amount of time has passed
    // necessary if some registerd voters are no shows
    function setVotingClosed() public onlyAdmin {}

    // VOTERS
    function registerVoter() public payable {
        require(voterRegistrationOpen, 'voter registration not open');
        require(msg.value >= buyin, "value must not be less than buyin");
        grantRole(_voters, msg.sender);
    }

    function vote(address payable candidateAddress) public onlyVoter {
        require(votingOpen, 'voting is not open yet');
        candidates[candidateAddress] = candidates[candidateAddress] + 1;
        
        if (candidates[candidateAddress] > mostVotes) {
            mostVotes = candidates[candidateAddress];
            currentWinner = candidateAddress;
        }

        revokeRole(_voters, msg.sender);
        if (getRoleMemberCount(_voters) == 0) {
            payoutWinner();
        }
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
