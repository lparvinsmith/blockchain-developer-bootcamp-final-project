// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "@openzeppelin/contracts/access/Roles.sol";

contract RetroactiveFunding {
    using Roles for Roles.Role;

    Roles.Role private _admin;

    address public owner = msg.sender;
    uint256 buyin;
    bool voterRegistrationOpen;
    bool projectSubmissionOpen;

    struct candidate {
        address projectAddress;
        string title;
    }

    candidate[] public candidates;
    mapping(address => candidate) public voters;

    modifier onlyOwner() {
        require(msg.sender == owner, "is not owner");
        _;
    }

    modifier onlyAdmin() {
        require(_admin.has(msg.sender), "does not have admin role");
        _;
    }

    // fallback?

    // ADMIN
    function setAdmin(address[] addresses) public onlyOwner {
        for (uint256 i = 0; i < addresses.length; ++i) {
            _admin.add(addresses[i]);
        }
    }

    function setMinimumBuyin(uint256 amount) public onlyAdmin {}

    function setVoterRegistrationOpen() public onlyAdmin {}

    function setVoterRegistrationClosed() public onlyAdmin {}

    function setProjectSubmissionOpen() public onlyAdmin {}

    function setProjectSubmissionClosed() public onlyAdmin {}

    function setVotingOpen() public onlyAdmin {}

    // only allow if certain amount of time has passed
    // necessary if some registerd voters are no shows
    function setVotingClosed() public onlyAdmin {}

    // VOTERS
    function registerVoter() public payable {}

    function vote() public {}

    // CANDIDATES
    function registerCandidate() public {}

    // PRIVATE
    // send winner the money or buy up project tokens
    function payoutWinner() private {}
}
