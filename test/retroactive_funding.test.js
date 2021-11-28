const RetroactiveFunding = artifacts.require("RetroactiveFunding");
const { catchRevert } = require("./exceptionsHelpers.js");

const DEFAULT_BUYIN = web3.utils.toBN(10**10);

contract("RetroactiveFunding", function (accounts) {
  const [_owner, alice, bob] = accounts;

  let instance;

  beforeEach(async () => {
    instance = await RetroactiveFunding.new('RetroVote', 'RETRO', DEFAULT_BUYIN);
  });

  describe("Admin", () => {
    it('should let owner set admin', async () => {
      const tx = await instance.setAdmin([alice], {from: _owner});

      const eventEmitted = tx.logs[0].event == "RoleGranted";
     
      assert.equal(eventEmitted, true, 'address should be added to admin role');
    });

    it('should let admin update status variables', async () => {
      await instance.setAdmin([alice], {from: _owner});
      await instance.setVoterRegistrationClosed({from: alice});

      const result = await instance.voterRegistrationOpen();

      assert.equal(result, false, 'admin should be able to set voterRegistrationOpen to false');

    });

    it('should let admin update buyin', async () => {
      await instance.setAdmin([alice], {from: _owner});
      await instance.setBuyin(100, {from: alice});

      const result = await instance.buyin();

      assert.equal(result, 100, 'admin should be able to set buyin');

    });

  });

  describe("Candidates", () => {

    it('should let candidates register themselves', async () => {
      await instance.registerCandidate({from: bob});

      const candidateCount = await instance.candidates(bob);

      assert.equal(candidateCount, 1, 'candiate should be added to mapping');

    });

  });

  describe("Voting", () => {

    it('should let voters register themselves', async () => {
      const tx = await instance.registerVoter({from: alice, value: DEFAULT_BUYIN});
      
      const eventEmitted = tx.logs[0].event == "Transfer";
     
      assert.equal(eventEmitted, true, 'minted token should be transfered');
    });

    it('should require buyin to register voter', async () => {
      await catchRevert(instance.registerVoter({from: alice}));
    });

    it('should not let non-token holders vote', async () => {
      await instance.registerCandidate({from: bob});
      await instance.setVotingOpen({from: _owner});
      await catchRevert(instance.vote(bob, {from: bob}));
    });

    it('should update vote counts on vote', async () => {
      await instance.registerVoter({from: alice, value: DEFAULT_BUYIN});
      await instance.registerCandidate({from: bob});
      await instance.setVotingOpen({from: _owner});
      await instance.vote(bob, {from: alice});

      const candidateCount = await instance.candidates(bob);
      const mostVotes = await instance.mostVotes();
      const currentWinner = await instance.currentWinner();

      assert.equal(candidateCount, 2, 'vote should be counted');
      assert.equal(mostVotes, 2, 'mostVotes should be updated');
      assert.equal(currentWinner, bob, 'currentWinner should be updated');
    });

    it('should only let token holder vote once', async () => {
      await instance.registerVoter({from: alice, value: DEFAULT_BUYIN});
      await instance.registerCandidate({from: bob});
      await instance.setVotingOpen({from: _owner});
      await instance.vote(bob, {from: alice});
      await catchRevert(instance.vote(bob, {from: alice}));
    });

    it('should payout the winner', async () => {
      await instance.registerVoter({from: alice, value: DEFAULT_BUYIN});
      await instance.registerCandidate({from: bob});
      await instance.setVoterRegistrationClosed({from: _owner});
      await instance.setVotingOpen({from: _owner});

      const bobBalanceBefore = await web3.eth.getBalance(bob);
      const tx = await instance.vote(bob, {from: alice});
      const eventEmitted = tx.logs[0].event == "WeHaveAWinner";
      const bobBalanceAfter = await web3.eth.getBalance(bob);
     
      assert.equal(eventEmitted, true, 'payout should fire event');
      assert.isAbove(Number(bobBalanceAfter), Number(bobBalanceBefore), 'winner should get total contract balance');
    });

  })

})