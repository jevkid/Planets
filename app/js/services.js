angular.module('planetsApp.services', []).
	
	factory('planetsApiService', function($http) {

		var planetsAPI = {};

		planetsAPI.getPlanets = function(){
			return $http({
				type: 'GET',
				contentType: 'application/json',
				url: 'http://swapi.co/api/planets/'
			});
		}

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
		}

		return planetsAPI;

	});