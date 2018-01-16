const dummy = require('../utils/list_helper').dummy
const expect = require('chai').expect

const list = require('../utils/list_helper')

describe('dummy is called', () => {
    it('dummiES', () => {

        const blogs = []

        const result = list.dummy(blogs)
        expect(result).to.equal(1)

    })
})

