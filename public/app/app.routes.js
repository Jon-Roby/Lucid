angular.module('app.routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/views/pages/home.html'
      })

      .state('about', {

      });

      // .when('/', {
      //   templateUrl: 'app/views/pages/home.html',
      //   controller: 'mainController',
      //   controllerAs: 'main'
      // });
      //
      // $locationProvider.html5Mode(true);
  });
