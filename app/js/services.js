angular.module('planetsApp.services', []).
	
	factory('planetsApiService', function($http) {

		var planetsAPI = {};
		// Get data from planets endpoint
		planetsAPI.getPlanets = function(page, input){

			var planetUrl = 'http://swapi.co/api/planets/';
			page = page && input ? '?page=' + page : '';
			input = page && input ? '&search=' + input : (input && !page ? '?search=' + input : '');

			return $http({
				type: 'GET',
				contentType: 'application/json',
				url: planetUrl + page + input
			});

		};
		// Get data from films endpoint
		planetsAPI.getFilmNames = function(filmUrl){

			var filmNames = [];
			for(var i = 0; i < filmUrl.length; i++){				
				$http({
					type: 'GET',
					contentType: 'application/json',
					url: filmUrl[i]
				}).success(function(data){
					filmNames.push(data.title);
				});
			}

			return filmNames;
		};

		return planetsAPI;

	});