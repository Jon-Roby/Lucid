angular.module('postsDisplayService', [])

.factory('PostsDisplay', function($http) {

	var postFactory = {};

	postFactory.all = function() {
		return $http.get('/api/posts/');
	};


	return postFactory;

});
