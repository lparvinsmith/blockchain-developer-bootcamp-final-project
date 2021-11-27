# Design Pattern Decisions

## Inheritance and interfaces

The RetroactiveFunding smart contract inherits from two OpenZeppelin contracts. This contract uses `is` to derive from the other contracts, thereby accessing all internal functions and state variables.

1. [Access Control](https://docs.openzeppelin.com/contracts/4.x/api/access#AccessControl) - Contract module that allows children to implement role-based access control mechanisms.
2. [ERC721 Enumerable](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#ERC721Enumerable) - Implementation of [ERC721](https://eips.ethereum.org/EIPS/eip-721) Non-Fungible Token Standard, including the Enumerable extension that adds enumerability of all the token ids in the contract as well as all token ids owned by each account.

It also uses an Open Zeppelin library called [Counters](https://docs.openzeppelin.com/contracts/3.x/api/utils#Counters) which provides counters that can only be incremented or decremented by one. This functionality is accessed by the directive `using A for B;` which attaches the library functions (from the library A) to any type (B) in the context of a contract.

## Role-based access control

The smart contract uses Open Zepplin's [Access contract](https://docs.openzeppelin.com/contracts/4.x/api/access#AccessControl) for managing addresses assigned to a role. This lets the contract owner establish Admin users that may configure minimum buyin, voter registration open, project submission open, and voting open.

## Optimizing gas

The smart contract aims to reduce cost of gas on both contract deployment and calling contract methods with the following principles:

- avoid creating and modifying storage variables can be expensive.
- short circuit rules
- avoid expensive operations in a loop / reduce loops
