const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const chai = require('chai')
const should = chai.should();
const chaiHttp = require('chai-http');
const User = require('../models/user')
chai.use(chaiHttp);

const initialUsers = [
    {
        username: "iivu",
        name: "Iivo",
        password: "succESs"
    }
]

describe('User API tests', () => {

    beforeEach(async function () {
        await User.remove({})
        const userObjects = initialUsers.map(user => new User(user))
        const promiseArray = userObjects.map(user => user.save())
        await Promise.all(promiseArray)
    })

    after(() => {
        server.close()
    })

    it('username length enforced', (done) => {
        const newUser = {
            username: 'iv',
            name: 'Iivo',
            password: 'ESonEriJuoma'
        }

        chai.request(server)
            .post('/api/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(400)
                chai.expect(res.body.error).to.be.string("username missing or too short")
                
                chai.request(server)
                    .get('/api/users')
                    .end((err, res) => {
                        chai.expect(res.body.length).to.be.eql(initialUsers.length)
                        done()
                    });
            });
    });

    it('username enforced', (done) => {
        const newUser = {
            name: 'Iivo',
            password: 'ESonEriJuoma'
        }

        chai.request(server)
            .post('/api/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(400)
                chai.expect(res.body.error).to.be.string("username missing or too short")
                done()
            });
    });

    it('username uniqueness enforced', (done) => {
        const newUser = {
            username: 'iivu',
            name: 'Iivo',
            password: 'ESesses'
        }

        chai.request(server)
            .post('/api/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(400)
                chai.expect(res.body.error).to.be.string("username not unique")
                chai.request(server)
                    .get('/api/users')
                    .end((err, res) => {
                        chai.expect(res.body.length).to.be.eql(initialUsers.length)
                        done()
                    });
            });
    });

    it('password length enforced', (done) => {
        const newUser = {
            username: 'iivo',
            name: 'Iivo',
            password: 'ES'
        }

        chai.request(server)
            .post('/api/users')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(400)
                chai.expect(res.body.error).to.be.string("password missing or too short")
                done()
            });
    });
});