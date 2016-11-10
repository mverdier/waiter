This is a simple node.js web API server using web-services.
It serves the requested beers to the front-ends, such as https://github.com/mverdier/angularBeer.

The basic use is /get?name=beerName&brand=beerBrand&country=beerCountryCode&taste=beerTaste&flavor=beerFlavor&color=beerColor

No parameter is necessary and you can just go with /get alone.
You can also use it with any parameters, such as name and taste, or color only, etc.

If there is data to return, it will return an array of JSON objects with all those fields documented, as well as their unique _id field.
It will return an empty array [] if there is no data to show for this query.