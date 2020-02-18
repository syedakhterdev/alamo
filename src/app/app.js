import angular from "angular";

import "../style/app.css";
import AppService from "./api-service";

let app = () => {
  return {
    template: require("./app.html"),
    controller: "AppCtrl",
    controllerAs: "app"
  };
};

class AppCtrl {
  constructor(appService, $scope) {
    $scope.cinemas = [];
    $scope.movies = [];
    $scope.selectedMovies = [];
    $scope.selectedCinema = "";
    appService.getData().then(result => {
      console.log(result);
      $scope.cinemas = result.data.data.market.cinemas;
      $scope.movies = result.data.data.sessions;
    });
    $scope.loadMovies = cinema => {
      $scope.selectedCinema = cinema.name;
      $scope.selectedMovies = $scope.movies.filter(
        obj => obj.cinemaId === cinema.id
      );
      $scope.selectedMovies.reduce(
        (unique, item) =>
          unique.includes(item.filmName) ? unique : [...unique, item],
        []
      );
      console.log($scope.selectedMovies);
    };
    $scope.selected = cinema => {
      $scope.cinemas.forEach(obj => {
        if (obj.id === cinema.id) {
          obj.selected = true;
        } else {
          obj.selected = false;
        }
      });
    };
  }
}

const MODULE_NAME = "app";

angular
  .module(MODULE_NAME, [])
  .directive("app", app)
  .service("appService", AppService)
  .controller("AppCtrl", AppCtrl);

export default MODULE_NAME;
