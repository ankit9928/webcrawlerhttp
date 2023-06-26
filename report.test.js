const {sortPages} = require('./report.js')
const{test , expect} = require('@jest/globals')

test('sortPages' , () =>{
    
  const input = {
        'https://wegslane.dev/path' : 2,
        'https://wegslane.dev':3
  }
  const actual = sortPages(input);
  
  const expected = [
       
        ['https://wegslane.dev' , 3],
        ['https://wegslane.dev/path', 2]
  ]

  expect(actual).toEqual(expected);

})


test('sortPages 5 Pages' , () =>{
    
  const input = {
        'https://wegslane.dev/path' : 2,
        'https://wegslane.dev':3,
        'https://wegslane.dev/path1' :4,
        'https://wegslane.dev/path2' : 6,
        'https://wegslane.dev/path3' : 5
  }
  const actual = sortPages(input);
  
  const expected = [

        ['https://wegslane.dev/path2', 6],
        ['https://wegslane.dev/path3', 5],
        ['https://wegslane.dev/path1', 4],
        ['https://wegslane.dev', 3 ],
        ['https://wegslane.dev/path', 2]
  ]
  

  expect(actual).toEqual(expected);

})