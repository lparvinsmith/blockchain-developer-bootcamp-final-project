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
      await instance.setAdmin([alice], {from: _owner})
      
      const hasRole = await RetroactiveFunding.hasRole(DEFAULT_ADMIN_ROLE, alice)

      assert.equal(hasRole, true, 'address should be added to admin role')
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