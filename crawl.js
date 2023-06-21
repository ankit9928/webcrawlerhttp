
const{JSDOM} = require('jsdom')


function getURLsFromHTML(htmlBody,baseURL){
        const urls = []
        const dom = new JSDOM(htmlBody)
        const linkElements  = dom.window.document.querySelectorAll('a')
        for(const linkElement of linkElements){
          if(linkElement.href.slice(0,1) === '/'){
                
                     // this when the url is relative 
              try{

                const urlobj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlobj.href)
              }catch(error){
                      console.log(`error with the relative url: ${error.message}`)
              } 

             
          }
          else{

            try{
              const urlobj = new URL(linkElement.href)
              urls.push(urlobj.href)
            }catch(error){
              console.log(`error with the absolute url: ${error.message}`)
            }
            
          }
        }

        return urls
}

function normalizeURL(urlString){
  
  const urlobj = new URL(urlString);
  const hostpath = `${urlobj.hostname}${urlobj.pathname}`
  if(hostpath.length > 0 && hostpath.slice(-1) === '/'){
     return hostpath.slice(0,-1);
  }

  return  hostpath;
}



module.exports = {
    normalizeURL, getURLsFromHTML
}