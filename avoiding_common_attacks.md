# Avoiding common attacks

The smart contract protects against the following attacks, referred to in some cases by SWC number from the [Smart Contract Weakness Classification Registry](https://swcregistry.io)

## Using Specific Compiler Pragma (SWC-103)

This contract uses a specific compiler pragma: `pragma solidity 0.8.10;` Locking the pragma helps to ensure that contracts do not accidentally get deployed using a compiler version that might introduce bugs.

## Checks-Effects-Interactions (SWC-107)

This pattern avoids the Reentrancy or recursive call attack by limiting external calls. Only the private `payoutWinner` function makes a transfer call to the winning candidate's address. While the elected winner could hypothetically be a malicious contract, the total contract balance is transfered to the winner anyways, leaving nothing else to steal.

## Proper Use of Require, Assert and Revert

Uses `require` to validate inputs, contract state, and variables before state changes. This is used at the beginning of functions and refunds remaining gas when conditions fail.

Uses fallback function with `revert` to revert the current transaction and refund remaining gas if there is no function in the contract matching the function call.

## Use Modifiers Only for Validation

This contract has two modifiers, `onlyOwners` and `onlyAdmin` to validate a user's role. There is no external or state-changing logic in them.
