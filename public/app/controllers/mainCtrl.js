angular.module('mainCtrl', [])

  .controller('mainController', function($rootScope, $location, Auth) {

  	var vm = this;

  	vm.loggedIn = Auth.isLoggedIn();

  	$rootScope.$on('$routeChangeStart', function() {
  		vm.loggedIn = Auth.isLoggedIn();

  		Auth.getUser()
  			.then(function(data) {
  				vm.user = data.data;
  			});
    });

    vm.trending = "trending";
    vm.recent = "recent";
    vm.popular = "popular";

    vm.selectedTab = vm.trending;

    console.log("main.selectedTab === vm.recent: " + (vm.selectedTab === vm.recent).toString());
    console.log("main.selectedTab === vm.popular: " + (vm.selectedTab === vm.popular).toString());

		vm.switchTab = function(tab) {

			vm.selectedTab = tab;

      console.log("main.selectedTab === vm.recent: " + (vm.selectedTab === vm.recent).toString());
      console.log("main.selectedTab === vm.popular: " + (vm.selectedTab === vm.popular).toString());
		};



  	vm.signup = function() {
  		vm.processing = true;
  		vm.error = '';

  		Auth.register(vm.loginData.name, vm.loginData.username, vm.loginData.password)
  			.success(function(data) {
  				vm.processing = false;
  				if (data.success) {
  					$location.path('/posts');
  				} else {
  					vm.error = data.message;
  				}
  	    });
  	  };

  	vm.login = function() {
  		vm.processing = true;
  		vm.error = '';

      Auth.logout();

  		Auth.login(vm.loginData.username, vm.loginData.password)
  			.success(function(data) {

  				vm.processing = false;
  				if (data.success) {
  					$location.path('/posts');
  				} else {
  					vm.error = data.message;
          }
  			});
  	};

  	vm.logout = function() {
      console.log("culkjlkjlkj");
  		Auth.logout();
  		vm.user = '';

  		// $state.go('posts');
  	};
});
