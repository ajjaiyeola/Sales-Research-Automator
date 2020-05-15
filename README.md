# Sales-Research-Automator

<h3>Problem 1 </h3>

While prospecting for restaurants, retailers, and grocery stores in the U.S, I realized I was never able to find an exhaustive list of all organizations in each of these verticals. As a result, I spent a lot of time scouring different lists online to find brands I might have missed.

<h3> Solution </h3>

Using the Google Knowledge Graph API, I built a tool that automatically searches the web for different organizations in the "restaurant", "retail", or "grocery categories" and generates a list for me. This saves me the countless google searches I would otherwise have to do to generate a thorough list.

<h3> Some Implementation Details </h3>

In brandsearch.js, I define the vertical (fast food for example) and U.S state I want to query the Google Knowledge Graph API for. After making a request to the API, the data that is returned is examined to ensure only the types of organizations I am interested in are presented. For example, if I search for "quick service restaurants in Alabama", the script can review the returned data to ensure no organization that has a description of "fullservice" is returned with the result.

<h3>Problem 2 </h3>


<h3> Solution </h3>


<h3> Some Implementation Details </h3>

