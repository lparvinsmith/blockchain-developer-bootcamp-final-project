# Design Pattern Decisions

## Inheritance and interfaces

The RetroactiveFunding smart contract inherits from a contract that allows children to use role-based access control methods (discussed below). The contract uses `is` to derive from another contract, thereby accessing all internal functions and state variables.

## Role-based access control

The smart contract uses Open Zepplin's [Access contract](https://docs.openzeppelin.com/contracts/4.x/api/access#AccessControl) for managing addresses assigned to a role. This lets the contract owner establish Admin users that may configure minimum buyin, voter registration open, project submission open, and voting open.

## Optimizing gas

The smart contract aims to reduce cost of gas on both contract deployment and calling contract methods with the following principles:

- avoid creating and modifying storage variables can be expensive.
- short circuit rules
- avoid expensive operations in a loop / reduce loops
