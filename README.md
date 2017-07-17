# Planets of Star Wars

This project used `angular-seed` as a skeleton to get Angular and a simple http server up and running.

## Getting Started

To run locally, clone this repo, run `npm install` to ensure all dependencies are installed, and then run `npm start` to start the server. The site will be available on port 8000.

### API

The data is pulled from the following API:  http://swapi.co/api/planets/ 

### Sorting 

Each of the table columns are sortable by ascending/descending order. Any data that contains numbers but was a String was converted to an Int to ensure accuracy in sorting.

### Searching

The user can search in one of two ways- filtering through the displayed results in the table, or sending a request to the API, therefore searching all results instead of only the 10 displayed. Using Angular's basic filter function, the user can type in their query and get results back immediately, or type in their query and click the search icon to hit the API.

### Sources

[angularjs]: https://angularjs.org/
[bower]: http://bower.io/
[http-server]: https://github.com/indexzero/http-server
