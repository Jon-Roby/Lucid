angular.module('app.routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    
      .state('login', {
        url: '/login',
        templateUrl: "app/views/login.html",
        controller: "mainController",
        controllerAs: "login"
      })

      .state('signup', {
        url: '/signup',
        templateUrl: "app/views/signup.html",
        controller: "mainController",
        controllerAs: "signup"
      });

      // .when('/', {
      //   templateUrl: 'app/views/pages/home.html',
      //   controller: 'mainController',
      //   controllerAs: 'main'
      // });
      //
      // $urlRouterProvider.html5Mode(true);
  });
