const { crawlPage } = require("./crawl")


async function main(){

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
     const pages = await crawlPage(baseurl, baseurl, {});

     for(const page of Object.entries(pages)){
          console.log(page);
     }

}

main();