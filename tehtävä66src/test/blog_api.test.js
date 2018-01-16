const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const chai = require('chai')
const should = chai.should();
const chaiHttp = require('chai-http');
const Blog = require('../models/blog')
chai.use(chaiHttp);


const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'ES is bestest',
        author: 'every web developer',
        url: 'dsdas',
        likes: 10
    },
    {
        title: 'C is the future of web development',
        author: 'every web developer',
        url: 'lfödsk',
        likes: 9001
    }
]

describe('/GET blogs', () => {
    before(async function () {
        await Blog.remove({})
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    after(() => {
        server.close()
    })

    it('blogs are returned as json', (done) => {
        chai.request(server)
            .get('/api/blogs')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });

    it('all blogs are returned', (done) => {
        chai.request(server)
            .get('/api/blogs')
            .end((err, res) => {
                res.body.length.should.be.eql(initialBlogs.length);
                done();
            });
    });

    it('a specific blog is within the returned blogs', (done) => {
        chai.request(server)
            .get('/api/blogs')
            .end((err, res) => {
                const string = JSON.stringify(res.body)
                chai.expect(string).to.have.string('C is the future of web development')
                done();
            });
    });
});