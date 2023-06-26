function printReport(pages){ 

      console.log("==========")
      console.log("REPORT") 
      console.log("==========")  
      
     const sortedPages = sortPages(pages);

      for(const sortedpage of sortedPages){
        const url = sortedpage[0]
        const Hits = sortedpage[1]
        console.log(`Found ${Hits} links to page: ${url}`)

      }

      console.log("==========")
      console.log("END OF REPORT") 
      console.log("==========") 
      
}


function sortPages(pages){

   const pagesArr = Object.entries(pages)

   pagesArr.sort((a,b) =>{
     aHITS = a[1]
     bHITS = b[1]
     return b[1] - a[1]
   })

  return pagesArr;

}

module.exports = {
     sortPages, 
     printReport
}