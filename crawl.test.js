const {normalizeURL} = require('./crawl.js')
const {test,expect} =  require('@jest/globals');

test('normalizeURL strip protocal', () => {
       const input = 'https://blog.boot.dev/path'
       const actual = normalizeURL(input)  
       const expected = 'blog.boot.dev/path'
       expect(actual).toEqual(expected)
}) 


test('normalizeURL strip trailing slash', () => {
       const input = 'https://blog.boot.dev/path/'
       const actual = normalizeURL(input)  
       const expected = 'blog.boot.dev/path'
       expect(actual).toEqual(expected)
}) 


test('normalizeURL strip http', () => {
       const input = 'http://BLOG.boot.dev/path'
       const actual = normalizeURL(input)  
       const expected = 'blog.boot.dev/path'
       expect(actual).toEqual(expected)
}) 


// test('normalizeURL strip protocal', () => {
//        const input = 'https://blog.boot.dev/path/'
//        const actual = normalizeURL(input)  
//        const expected = 'blog.boot.dev/path'
//        expect(actual).toEqual(expected)
// }) 