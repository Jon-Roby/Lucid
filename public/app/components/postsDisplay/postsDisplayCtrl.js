angular.module('postsDisplayCtrl', ['postsDisplayService'])

	.controller('postsDisplayController', function(PostsDisplay, Auth) {
		var vm = this;
		vm.processing = true;

		// Auth.getUser()
		// 	.then(function(data) {
		// 		PostsDisplay.getUserId(data.data._id)
		// 			.success(function(data) {
		// 				vm.userData = data;
		// 			});
		// 	});

		PostsDisplay.all()
			.success(function(data) {
				vm.processing = false;
				vm.posts = data;
			});
	});
