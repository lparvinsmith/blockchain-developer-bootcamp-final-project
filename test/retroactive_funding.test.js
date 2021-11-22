let RetroactiveFunding = artifacts.require("RetroactiveFunding");

contract("RetroactiveFunding", function (accounts) {
  const [_owner, alice, bob] = accounts;

  let instance;

  beforeEach(async () => {
    instance = await RetroactiveFunding.new();
  });

  describe("Admin", () => {
    it('should let owner set admin', async () => {
      const tx = await instance.setAdmin([alice], {from: _owner})
      let eventEmitted;
      if (tx.logs[0].event == "RoleGranted") {
        eventEmitted = true;
      }

      assert.equal(eventEmitted, true, 'adding admin should send RoleGranted event')
    });

    it('should let admin update status variables', async () => {

    });

  });

  describe("Candidates", () => {

    it('should let candidates register themselves', async () => {

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