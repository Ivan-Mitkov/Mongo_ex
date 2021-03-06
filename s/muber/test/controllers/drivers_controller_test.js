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
      //   console.log(error);
      throw new Error(error);
    }
  });
  it("update driver", async () => {
    const driver = await new Driver({ email: "driver@test.com" });
    await driver.save();

    // console.log(id);
    const newProps = {
      email: "drivr@test.com",
      driving: true
    };

    await request(app)
      //NO :!!!!
      .put(`/api/drivers/${driver._id}`)
      //send here is sending to server
      .send(newProps)
      .expect(200);

    const foundDriver = await Driver.find({});
    // console.log("driver: ", driver);
    assert(foundDriver[0].driving === true);
    assert(foundDriver[0].email === "drivr@test.com");
  });
  it("delete driver", async () => {
    const driver = await new Driver({ email: "delete@test.com" });
    await driver.save();
    await request(app)
      //NO :!!!!
      .delete(`/api/drivers/${driver._id}`)
      .send()
      .expect(204);

    const foundDriver = await Driver.findOne({ email: "delete@test.com" });
    assert(foundDriver === null);
  });

  it("GEt to /api/drivers finds drivers in a collection", async () => {
    const seattleDriver = await new Driver({
      email: "seattle@test.com",
      geometry: {
        type: "Point",
        coordinates: [-122.4759902, 47.6147628]
      }
    });
    const miamiDriver = await new Driver({
      email: "miami@test.com",
      geometry: {
        type: "Point",
        coordinates: [-80.2, 25.791]
      }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80.25&lat=25.79")
        .end((err, res) => {
          // console.log(res.status);
          // console.log(res.body[0].email);
          console.log('distance = ',res.body[0].dist,' metres')
          assert(res.body.length === 1);
          assert(res.body[0].email === "miami@test.com");
        });
    });
  });
});
