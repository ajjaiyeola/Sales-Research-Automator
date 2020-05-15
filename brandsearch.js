const express = require("express");
const request = require("request");
const API_KEY = "xxxxxxxxxx";
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


const industryAndLocationSearch = [

  "quick service restaurant Alabama",
  "quick service restaurant Alaska",
  "quick service restaurant Arizona",
  "quick service restaurant Arkansas",
  "quick service restaurant California",
];

// Make the Google Places API request and return the results

function fetchApi(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      let data = JSON.parse(body);
      let results = data.itemListElement;
      resolve(results);
    });
  });
}

// This main function has to be delcared as "async" in order to work
async function main() {
  // Loop through each item in the search array
  for (var searchIndex = 0; searchIndex < industryAndLocationSearch.length; searchIndex++) {
    let search = industryAndLocationSearch[searchIndex];
    let encodedSearch = encodeURIComponent(search);

    var url = 'https://kgsearch.googleapis.com/v1/entities:search?query=' + encodedSearch;
    url += "&key=" + API_KEY;
    url += '&indent=True&types=Organization'

    let results = await fetchApi(url);

    for (var resultIndex = 0; resultIndex < results.length; resultIndex++) {
      let info = results[resultIndex];

      if ((info.result.description) && (info.result.detailedDescription)) {
        var fullService = info.result.detailedDescription.articleBody.includes("full");
        if ((info.result.description.includes("restaurant")) || (info.result.description.includes("Restaurant"))) {
          if  (((info.result.detailedDescription.articleBody.includes("quick")) ||(info.result.detailedDescription.articleBody.includes("fast"))) &&!(fullService));{
            console.log(info.result.name + " : " + info.result.description);
          }
        }
      }

    }

  }

}

main();
