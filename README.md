# blockchain-developer-bootcamp-final-project

Final project for Consensus Blockchain Bootcamp
Frontend deployed here: TODO
Demo video here: TODO
Personal ETH Address for NFT: TODO

[Retroactive public goods funding](#retroactive-public-goods-funding)
[Directory structure](#directory-structure)
[Running locally](#running-locally)
[Design pattern decisions](./design_pattern_decisions.md)
[Avoiding common attacks](./avoiding_common_attacks.md)

## Retroactive Public Goods Funding

This project provides a template for communities to come together, establish a common problem, and establish incentives for entrepreneurs to solve the problem.

Inspired by Vitalik Buterin's talk: "Things that matter outside of defi" ([Video](https://www.youtube.com/watch?v=oLsb7clrXMQ&t=308s), July 21, 2021)

### Why Retroactive Funding

For a large group of people, retrospective decisions are easier than prospective decisions. This allows a large group to agree only on a shared problem, but does not require agreeing on the best solution until after the fact.

### The DAO, or the Community

The decentralized autonomous organization (DAO) is the contract that establishes the problem and formalizes the community members with voting power. During the formation of the DAO, members will contribute fees and receive voting power proportional to the amount they contribute. At the end of a specified term, the DAO members will vote on which project(s) were the most valuable, and buy up the project tokens.

### The Tokens, or the Incentive

Project tokens will be distributed to contributors and investors in a discrete project. This dapp will allow an entrepreneur to start a project, create project tokens, and raise funds by selling the tokens.

## Directory structure

`/contracts` : Directory for smart contracts written in Solidity. The Retroactive Funding contract is in `contracts/RetroactiveFunding.sol`

`/migrations` : Directory for scriptable deployment files

`/test` : Directory for unit tests to ensure contract code quality

`/client` : Directory for React client

## Running locally

### Contract

Created with [Truffle suite](https://www.trufflesuite.com/docs/truffle/overview). Truffle requires Node v8.9.4 or higher.

Install dependencies with `npm install`

Run locally with `truffle develop`

Run unit tests with `truffle test`

### Client

Created with [Create React App](https://create-react-app.dev)

From the /client directory, run the following commands:

Install dependencies with `npm install`

Run locally with `npm start`
