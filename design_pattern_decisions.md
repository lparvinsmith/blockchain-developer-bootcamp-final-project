# Design Pattern Decisions

## Inheritance and interfaces

This smart contract uses a Library (discussed below) with the [directive using A for B](https://docs.soliditylang.org/en/latest/contracts.html#using-for) to attach library functions (from the library A) to any type (B) in the context of a contract.

## Role-based access control

The smart contract uses Open Zepplin's [Roles library](https://docs.openzeppelin.com/contracts/2.x/api/access#Roles) for managing addresses assigned to a role. This lets the contract owner establish Admin users that may configure minimum buyin, voter registration open, and project submission open.

## Optimizing gas

The smart contract aims to reduce cost of gas on both contract deployment and calling contract methods with the following principles:

- avoid creating and modifying storage variables can be expensive.
- short circuit rules
- avoid expensive operations in a loop / reduce loops
