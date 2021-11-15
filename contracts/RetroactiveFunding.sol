// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract RetroactiveFunding {

    bytes32 public constant _admins = keccak256("_admins");
    bytes32 public constant _voters = keccak256("_voters");

    address public owner = msg.sender;
    uint256 buyin;

    bool voterRegistrationOpen = true;
    bool projectSubmissionOpen = true;
    bool votingOpen = false;

    mapping(address => uint256) public candidates;
    uint256 mostVotes;
    address currentWinner;

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

    // fallback?

    // ADMIN
    function setAdmin(address[] addresses) public onlyOwner {
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
        require(msg.value >= buyin, "value must not be less than buyin");
        grantRole(_voters, msg.sender);
    }

    function vote(address candidateAddress) public onlyVoter {
        require(candidates[candidateAddress], "candidate not found");
        candidates[candidateAddress] = candidates[candidateAddress] + 1;
        
        if (candidates[candidateAddress] > mostVotes) {
            mostVotes = candidates[candidateAddress];
            currentWinner = candidateAddress;
        }

        revokeRole(_voters, msg.sender);
        if (getRoleMemberCount(_voters) = 0) {
            payoutWinner();
        }
    }

    // CANDIDATES
    function registerCandidate() public {
        require(!candidates[msg.sender], "candidate already registered");
        candidates[msg.sender] = 0;
    }

    // PRIVATE
    function payoutWinner() private {
        require(!votingOpen, "voting must not be open");
        currentWinner.transfer(address(this).balance);
    }
}
