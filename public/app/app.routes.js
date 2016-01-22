angular.module('app.routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('login', {
        url: '/login',
        templateUrl: "app/views/pages/users/login.html",
        controller: "mainController",
        controllerAs: "login"
      })

      .state('signup', {
        url: '/signup',
        templateUrl: "app/views/pages/users/signup.html",
        controller: "mainController",
        controllerAs: "signup"
      })

  		.state('users', {
        url: '/users',
  			templateUrl: 'app/views/pages/users/all.html',
  			controller: 'userController',
  			controllerAs: 'user'
  		})

      .state('posts', {
        url: '/posts',
        views: {
          '': {
            templateUrl: "app/components/postsDisplay/postsDisplayLayout.html"
          },
          'postsDisplay@posts': {
            templateUrl: "app/components/postsDisplay/postsDisplayView.html",
            controller: "postsDisplayController",
            controllerAs: "postsDisplay"
          },
          'icons@posts': {
            templateUrl: "app/components/icons/iconsView.html",
            controller: "iconsController",
            controllerAs: "icons"
          },
          'menu@posts': {
            templateUrl: 'app/components/userSidebar/userSidebarView.html',
            controller: 'userSidebarController',
            controllerAs: 'menu'
          }
        }
      })

      .state('postCreate', {
        url: '/posts/create',
        templateUrl: 'app/components/postCreate/postCreateView.html',
        controller: 'postCreateController',
        controllerAs: 'post'
      })


      .state('post', {
        url: '/posts/:post_id',
        views: {
          '': {
            templateUrl: "app/components/postDisplay/postDisplayLayout.html"
          },
          'postDisplay@post': {
            templateUrl: "app/components/postDisplay/postDisplayView.html",
            controller: "postDisplayController",
            controllerAs: "postDisplay"
          },
          'postDetails@post': {
            templateUrl: "app/components/postDisplay/postDisplayDetails.html",
            controller: "postDisplayController",
            controllerAs: "postDisplay"
          },
          'postAuthor@post': {
            templateUrl: "app/components/postAuthor/postAuthorView.html",
            controller: "postAuthorController",
            controllerAs: "postAuthor"
          },
          'menu@post': {
            templateUrl: 'app/components/userSidebar/userSidebarView.html',
            controller: 'userSidebarController',
            controllerAs: 'menu'
          }
        }
      })

      .state('postEdit', {
        url: '/posts/:post_id/edit',
        templateUrl: 'app/components/postCreate/postCreateView.html',
        controller: 'postEditController',
        controllerAs: 'post'
      })

      .state('profile', {
        url: '/users/:user_id',
  			templateUrl: 'app/components/userDisplay/userDisplayView.html',
  			controller: 'userDisplayController',
  			controllerAs: 'user'
  		});

      // Allow a user to edit a profile
      // .state('profile', {
      //   url: '/users/:user_id/edit',
  		// 	templateUrl: 'app/components/userDisplay/userDisplayView.html',
  		// 	controller: '',
  		// 	controllerAs: ''
  		// });

      $locationProvider.html5Mode(true);
  });
