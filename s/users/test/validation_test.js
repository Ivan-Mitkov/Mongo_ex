const assert = require("assert");
const User = require("../src/user");

describe("Validating records", () => {
  it("requires a user name", () => {
    const user = new User({ name: undefined });
    //fot validation in DB use validate which is async
    const validationResult = user.validateSync();
    // console.log(validationResult)
    const message = validationResult.errors.name.message;
    //message from Schema
    assert(message === "Name is required");
  });

  it("Requires a username longe than 2 charachters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    //message from Schema
    assert(message === "Name must be longer than 2 charachters");
  });

  it('disallows invalid records from being saved',async()=>{
      const user=new User({name:'Al'})
      try{
        await user.save()
      }catch(validationResult){
        const message = validationResult.errors.name.message;
        //message from Schema
        assert(message === "Name must be longer than 2 charachters");
      }
      
  })
});
