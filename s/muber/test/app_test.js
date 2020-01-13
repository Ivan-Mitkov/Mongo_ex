const assert=require('assert');
const request=require('supertest');
const app =require('../app');

describe('The express app',()=>{
    it('Handles a GET request to api',async()=>{
        try {
            const response = await request(app).get('/api').expect(200);;
            assert(response.body.hi==='there')
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
       
    })
})