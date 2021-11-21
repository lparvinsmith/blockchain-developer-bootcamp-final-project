# Design Pattern Decisions

## Inheritance and interfaces

The RetroactiveFunding smart contract inherits from a library that allows children to use role-based access control methods (discussed below). The contract uses `is` to derive from another contract, thereby accessing all internal functions and state variables.

## Role-based access control

The smart contract uses Open Zepplin's [Access library](https://docs.openzeppelin.com/contracts/4.x/api/access#AccessControlEnumerable) for managing addresses assigned to a role. This lets the contract owner establish the following roles:

- Admin users that may configure minimum buyin, voter registration open, project submission open, and voting open.
- Voters that may vote on a candidate. When they vote successfully, their membership to this role is revoked to enforce one vote.

I used the Enumerable version so that payout can be triggered when the amount of registered voters reaches 0.

## Optimizing gas

The smart contract aims to reduce cost of gas on both contract deployment and calling contract methods with the following principles:

- avoid creating and modifying storage variables can be expensive.
- short circuit rules
- avoid expensive operations in a loop / reduce loops
