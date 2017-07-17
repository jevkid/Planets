angular.module('planetsApp.controllers', []).
	
	controller('planetsController', function($scope, planetsApiService) {

	$scope.planetInput = null;
	$scope.planetList = [];
	$scope.pageList = [];
	$scope.currentPage = 1;

	// Main function for sending a request to the planet API service
	$scope.planetRequest = function(page, input){
		// If the page is a link instead of a number, parse the link to get the page number
		if(page && !(/^\d+$/i.test(page)) && page !== null){
			// Ensure the page is returned as an int
			page = parseInt(page.split('?page=')[1], 10);
		}
		// Make a request to the endpoint, function in services.js
		planetsApiService.getPlanets(page, input).success(function (data) {
			// Loop through the data returned, if the data is a number, ensure it's an int so that it can be sorted correctly in the table
			for(var i = 0; i < data.results.length; i++){
				for(var key in data.results[i]){
					if(data.results[i].hasOwnProperty(key) && (/^\d+$/i.test(data.results[i][key]))){
						data.results[i][key] = parseInt(data.results[i][key], 10);
					}
				}
			}

			if(!input){
				paginate(page, data.count);
				$scope.planetInput = null;			
			}
			// Set the planet list with the data returned
			$scope.planetList = data;
			// Take the data and pass it to a function that returns the names of films instead of links to their enpoint
			getFilms(data);

		});

	};
	// Sets page numbers and the current page
	var paginate = function(page, count){
		// Set the current page to the page passed in
		if(page && page !== null){
			$scope.currentPage = page;
		} else {
			// Take the count of results and divide it by number of results per page to get the number of pages to show
			var pages = Math.ceil(count / 10);
			// Create page numbers to display in template
			for(var i = 0; i < pages; i++){
				$scope.pageList.push(i+1);
			}
		}

	};
	// Loop through data results and get associated endpoints for films to retrieve film titles
	var getFilms = function(data){

		for(var i = 0; i < data.results.length; i++){
			var result = data.results[i].films;
			$scope.planetList.results[i].filmList = planetsApiService.getFilmNames(result);
		}

	};

	// Get planets on page load
	$scope.planetRequest();

});