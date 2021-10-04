// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract RetroactiveFunding {
    address public owner = msg.sender;
    uint256 buyin;
    bool voterRegistrationOpen;
    bool projectSubmissionOpen;

    struct candidate {
        address projectAddress;
        address tokens;
        string title;
        string description;
    }

    candidate[] public candidates;
    mapping(address => candidate) public voters;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // fallback?

    // ADMIN
    function setMinimumBuyin(uint256 amount) public onlyOwner {}

    function setVoterRegistrationOpen() public onlyOwner {}

    function setVoterRegistrationClosed() public onlyOwner {}

    function setProjectSubmissionOpen() public onlyOwner {}

    function setProjectSubmissionClosed() public onlyOwner {}

    function setVotingOpen() public onlyOwner {}

    // only allow if certain amount of time has passed
    // necessary if some registerd voters are no shows
    function setVotingClosed() public onlyOwner {}

    // VOTERS
    function registerVoter() public payable {}

    function vote() public {}

    // CANDIDATES
    function registerCandidate() public {}

    // PRIVATE
    // send winner the money or buy up project tokens
    function payoutWinner() private {}
}
