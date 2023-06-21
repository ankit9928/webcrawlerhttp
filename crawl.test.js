const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocal", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});


test("getURLsFromHTML absolute", () => {
       const inputHTMLBody = `
      <HTML> 
          <body>
              <a href="https://blog.boot.dev/">
                       Boot.dev Blog
              </a>
          </body>
      </HTML>        
       `
       const inputBaseURL = "https://blog.boot.dev"
       const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
       const expected = ["https://blog.boot.dev/"]
       expect(actual).toEqual(expected)
})



test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
 <HTML> 
     <body>
         <a href="/path/">
                  Boot.dev Blog
         </a>
     </body>
 </HTML>        
  `
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected)
})

test("getURLsFromHTML Both", () => {
  const inputHTMLBody = `
 <HTML> 
     <body>
         <a href="https://blog.boot.dev/path1/">
                  Boot.dev Blog path one 
         </a>
         <a href="/path2/">
                  Boot.dev Blog path two 
         </a>
     </body>
 </HTML>        
  `
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
  const expected = ["https://blog.boot.dev/path1/" , "https://blog.boot.dev/path2/"]
  expect(actual).toEqual(expected)
})




test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
 <HTML> 
     <body>
         <a href="invalid">
                invalid url
         </a>
     </body>
 </HTML>        
  `
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
  const expected = []
  expect(actual).toEqual(expected)
})