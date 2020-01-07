const assert=require('assert');
const User = require('../src/user');

describe('Virtual Types',()=>{
it('postCount returns number of posts',async ()=>{
    const joe=new User({name:'Joe',posts:[{title:'Post'}]})
    await joe.save();
    const newJoe=await User.findOne({name:'Joe'})
    assert(newJoe.postCount===1)

})
})