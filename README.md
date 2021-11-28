# blockchain-developer-bootcamp-final-project

Final project for Consensus Blockchain Bootcamp

- Frontend deployed here: TODO
- Demo video here: TODO
- Personal ETH Address for NFT: TODO

Contents

- [Retroactive public goods funding](#retroactive-public-goods-funding)
- [Directory structure](#directory-structure)
- [Running locally](#running-locally)
- [Design pattern decisions](./design_pattern_decisions.md)
- [Avoiding common attacks](./avoiding_common_attacks.md)

## Retroactive Public Goods Funding

This project provides a template for communities to come together, establish a common problem, and establish an incentive for entrepreneurs to solve the problem.

Inspired by Vitalik Buterin's talk: "Things that matter outside of defi" ([Video](https://www.youtube.com/watch?v=oLsb7clrXMQ&t=308s), July 21, 2021)

### Why Retroactive Funding

For a large group of people, retrospective decisions are easier than prospective decisions. This allows a large group to agree only on a shared problem, but does not require agreeing on the best solution until after the fact.

### The DAO, or the Community

The decentralized autonomous organization (DAO) is the contract that establishes the problem and formalizes the community members with voting or administrative power. During the formation of the DAO, members will contribute a buyin and receive one vote. At the end of a specified term, the DAO members will vote on which project was the most valuable.

### The Creators, or Candidates

Project creators can register their projects in the contract until project submissions are closed. Their project pitch and updates would be communicated in an external service like discord. When the voting is complete, the winner will receive the total contract value collected from the voter buyins.

### The Voting Token, or NFT

Voters who pay the appropriate buyin receive an NFT which allows them one vote on a candidate. They can sell this NFT if they lose interest in the DAO, and the buyer can assume voting rights.

### Upcoming improvements

The voter NFT minted is currently just a unique token with no metadata. In a future iteration, the contract owner would be able to configure a unique design for the NFT to increase the NFT's value as a collectible.

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
