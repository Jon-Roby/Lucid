angular.module('myApp', ['app.routes', 'authService', 'mainCtrl'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});
