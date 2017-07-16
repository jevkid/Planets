angular.module('planetsApp.controllers', []).
	
	controller('planetsController', function($scope, planetsApiService) {

	$scope.planetFilter = null;
	$scope.planetList = [];
	$scope.pageList = [];
	$scope.homePage = 1;

	
	$scope.planetRequest = function(page){		
		if(page && !(/^\d+$/i.test(page)) && page !== null){
			page = page.split('?page=')[1];
		}
		planetsApiService.getPlanets(page).success(function (data) {
			for(var i = 0; i < data.results.length; i++){
				for(var key in data.results[i]){
					if(data.results[i].hasOwnProperty(key) && (/^\d+$/i.test(data.results[i][key]))){
						data.results[i][key] = parseInt(data.results[i][key], 10);
					}
				}
			}
			paginate(page, data.count);
			$scope.planetList = data;
			getFilms(data);
		});
	};

	var paginate = function(page, count){

		if(page && page !== null){
			$scope.homePage = page;
		} else {
			var pages = Math.ceil(count / 10);
			for(var i = 0; i < pages; i++){
				$scope.pageList.push(i+1);
			}
		}
	};

	var getFilms = function(data){
		for(var i = 0; i < data.results.length; i++){
			var result = data.results[i].films;
			$scope.planetList.results[i].filmList = planetsApiService.getFilmNames(result);
		}
	};

	$scope.planetRequest();
});