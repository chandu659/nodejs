let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect
chai.use(chaiHttp);

describe('Testing Api',() => {
    it('Should Return 200 for health',(done) => {
        chai.request('http://127.0.0.1:27017')
        .get('/health')
        .then((res) => {
            expect(res).to.have.status(200);
            done()
        })
        .catch((err) => {
            throw err
        })
    })

    it('should return 200 for requesting users',(done) =>{
        chai.request('http://127.0.0.1:27017')
        .get('/users')
        .then((res)=>{
            expect(res).to.have.status(200);
            done()
        })
        .catch((err)=>{
            throw err
        })
    })
    it('Should Return 200 for addUsers',(done) => {
        chai.request('http://127.0.0.1:7710')
        .post('/addusers')
        .send({"name":"TestingUser","isActive":true})
        .then((res) => {
            expect(res).to.have.status(200);
            done()
        })
        .catch((err) => {
            throw err
        })
    })
    it('should Retrun 200 for user deactivated', (done) =>{
        chai.request('http://127.0.0.1:7710')
        .put('/deactivateUser')
        .send({"_id":"65889fdc94d9ea230ad795b1"})
        .then((res)=>{
            expect(res).to.have.status(200);
            done()
        })
        .catch((err)=>{
            throw err
        })
    })
})