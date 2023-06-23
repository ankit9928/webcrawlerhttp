const { crawlPage } = require("./crawl")


function main(){

     if(process.argv.length < 3){
          console.log("No website provided")
          process.exit(1)
     }

     if(process.argv.length > 3){
      console.log("To many argv commands")
      process.exit(1)
    }

      const baseurl = process.argv[2];

     console.log(`Starting crawl of ${baseurl}`);
     crawlPage(baseurl);

}

main();