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

  	vm.signup = function() {
  		vm.processing = true;
  		vm.error = '';

  		Auth.register(vm.loginData.name, vm.loginData.username, vm.loginData.password)
  			.success(function(data) {
  				vm.processing = false;
  				if (data.success) {
  					$location.path('/login');
  				} else {
  					vm.error = data.message;
  				}
  	    });
  	  };

  	vm.login = function() {
  		vm.processing = true;
  		vm.error = '';
  		Auth.login(vm.loginData.username, vm.loginData.password)
  			.success(function(data) {
  				vm.processing = false;
  				if (data.success)
  					$location.path('/users');
  				else
  					vm.error = data.message;
  			});
  	};

  	vm.logout = function() {
  		Auth.logout();
  		vm.user = '';

  		$location.path('/login');
  	};
});
