const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("Post to api/drivers creates a new driver", async () => {
    //can test create driver 3 way
    //1.returned driver
    //2.look in driver collection and assert that driver with email test@test.com exists
    //3.count drivers in collection before and after the call
    try {
      const driverCountBefore = await Driver.countDocuments();
      await request(app)
        .post("/api/drivers")
        //send here is sending to server
        .send({ email: "test@test.com" })
        .expect(200);
      const driverCountAfter = await Driver.countDocuments();
      //expect what server is sending back

      assert(driverCountBefore + 1 === driverCountAfter);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });
});
