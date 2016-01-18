angular.module('myApp',

[
	'app.routes',
	'authService',
	'mainCtrl',
	// 'userCtrl',
	// 'userService',
	'postsDisplayCtrl',
	'postsDisplayService',
	'iconsCtrl',
	'iconsService',
	'userSidebarCtrl',
	'userSidebarService',

	'postDisplayCtrl',
	'postDisplayService',
	'postAuthorCtrl',
	'postAuthorService',

	'postCreateCtrl',
	'postCreateService',

	'userDisplayCtrl',
	'userDisplayService'
])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});
