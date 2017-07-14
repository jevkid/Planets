angular.module('planetsApp.controllers', []).
	
	controller('planetsController', function($scope, planetsApiService) {

	$scope.planetFilter = null;
	$scope.planetList = [];

	planetsApiService.getPlanets().success(function (data) {
		$scope.planetList = data;
		getFilms(data);
	});

	var getFilms = function(data){
		for(var i = 0; i < data.results.length; i++){
			var result = data.results[i].films;
			$scope.planetList.results[i].filmList = planetsApiService.getFilmNames(result);
		}
	};


});