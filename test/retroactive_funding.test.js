let RetroactiveFunding = artifacts.require("RetroactiveFunding");
let { catchRevert } = require("./exceptionsHelpers.js");

contract("RetroactiveFunding", function (accounts) {
  const [_owner, alice, bob] = accounts;

  let instance;

  beforeEach(async () => {
    instance = await RetroactiveFunding.new('RetroVote', 'RETRO', 10);
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
      const tx = await instance.registerVoter({from: alice, value: 10});
      
      const eventEmitted = tx.logs[0].event == "Transfer";
     
      assert.equal(eventEmitted, true, 'minted token should be transfered');

    });

    it('should require buyin to register voter', async () => {
      await catchRevert(instance.registerVoter({from: alice}));
    });

    it('should let voters vote once', async () => {

    });

    it('should payout the winner', async () => {

    });

  })

})