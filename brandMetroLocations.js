const request = require("request");
const API_KEY = "xxxxxxxxxxxx";
const brands = [
  "Jr. Food Mart",
  "K's Merchandise Mart",
  "Kmart",
  "Leslie's Poolmart",
  "Lotte Hi-Mart",
  "Lotte Mart",
  "Magic Mart",

];
// Lat and long of some major metro areas in the US
const metros = [
  "&location=29.424122,-98.493629&radius=50000", // San Antonio
  "&location=30.267153,-97.743057&radius=50000", // Austin
  "&location=37.774929,-122.419418&radius=50000", // SF
  "&location=40.712776,-74.005974&radius=50000", // New York
  "&34.147785,-118.144516&radius=50000",//Pasadena
  "41.878113,-87.629799&radius=50000",//Chicago
]
// Make the Google Places API request and return the results
function fetchApi(url) {
  return new Promise(function (resolve, reject) {
    request(url, function(error, response, body) {
      let data = JSON.parse(body);
      let results = data.results;
      resolve(results);
    });
  });
}
// This main function has to be delcared as "async" in order to work
async function main() {
  // Loop through each brand in the array
  for (var brandIndex = 0; brandIndex < brands.length; brandIndex++) {
    let brand = brands[brandIndex];
    let encodedBrand = encodeURIComponent(brand);
    // Keep track of the total number of locations we have found for the current brand
    var totalLocationsCount = 0;
    // Loop through the metros until we have determined that the brand has 20 locations or no more metros
    for (var metroIndex = 0; metroIndex < metros.length; metroIndex++) {
      let metro = metros[metroIndex];
      // console.log('- checking metro ' + (metroIndex + 1) + ' of ' + metros.length);
      // If we have already found 20 locations, stop requesting this brand
      if (totalLocationsCount >= 20) {
        break;
      }
      // Build the URL with the querystring paramters we need
      var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + encodedBrand;
      url += "&inputtype=textquery&key=" + API_KEY;
      url += metro
      // Make the API request and wait for the result to come back (this is crucially important to
      // wait, otherwise the looping will continue before we get a result back)
      let results = await fetchApi(url);
      // Keep track of how many matched results we have for this metro
      var numberOfMatchedResults = 0;
      // Now we need to look at each returned location to see if the name matches our brand
      for (var resultIndex = 0; resultIndex < results.length; resultIndex++) {
        let result = results[resultIndex];
        // If the name of the brand matches the name in the result, increment our match counter
        if (result.name.match(brand)) {
          numberOfMatchedResults += 1;
        }
      }
      // Now that we're done looping through results, increment our total locations with our metro locations
      totalLocationsCount += numberOfMatchedResults;
    }
    console.log(` "${brand}": ${totalLocationsCount}`);
  }
}
// Run the main function
main();
