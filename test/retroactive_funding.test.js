let RetroactiveFunding = artifacts.require("RetroactiveFunding");

contract("RetroactiveFunding", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000";

  let instance;

  beforeEach(async () => {
    instance = await RetroactiveFunding.new();
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

    });

    it('should let voters vote once', async () => {

    });

    it('should payout the winner', async () => {

    });

  })

})