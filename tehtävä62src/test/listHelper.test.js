const dummy = require('../utils/list_helper').dummy
const expect = require('chai').expect

const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithTwoBlogs = [
        {
            _id: 'dsadasdas',
            title: 'ES is bestest',
            author: 'every web developer',
            url: 'dsdas',
            likes: 10,
            __v: 0
        }
    ].concat(listWithOneBlog)

    it('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).to.equal(0)
    })

    it('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).to.equal(5)
    })

    it('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithTwoBlogs)
        expect(result).to.equal(15)
    })
})