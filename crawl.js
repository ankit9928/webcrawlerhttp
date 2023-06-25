
const{JSDOM} = require('jsdom')


async function crawlPage(baseURL, currentURL, pages){


        const baseURLObj = new URL(baseURL);
        const currentURLObj = new URL(currentURL);

        if(baseURLObj.hostname !== currentURLObj.hostname){
            return pages;
        }          
        
        
        const normalizedCurrentURL = normalizeURL(currentURL);

        if(pages[normalizedCurrentURL] > 0){
          pages[normalizedCurrentURL]++;
          return pages;
        }

        pages[normalizedCurrentURL] = 1

        console.log(`Actively crawling ${currentURL}`);


        try{

        const resp = await fetch(currentURL);
  
        if(resp.status > 399){
          console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
          return pages;
        }

        const contentType = resp.headers.get('content-type');

        if(!contentType.includes('text/html')){
          console.log(`no html response, content Type: ${contentType} on page: ${currentURL}`);
          return pages;
        }
        
        const htmlBody = await resp.text();

        const nextURLS =  getURLsFromHTML(htmlBody, baseURL);

        for(const nextURL of nextURLS){
             pages = await crawlPage(baseURL, nextURL, pages);
         }
      }catch(error){

          console.log(`error in fetch: ${error.message} on page ${currentURL}`);

        }

         return pages;

}


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
    normalizeURL, 
    getURLsFromHTML,
    crawlPage
}