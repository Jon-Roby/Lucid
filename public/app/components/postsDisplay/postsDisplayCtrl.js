angular.module('postsDisplayCtrl', ['postsDisplayService', 'postsOptionsService'])

	.controller('postsDisplayController', function(PostsDisplay, Auth, PostsOptions, $stateParams) {
		var vm = this;
		vm.processing = true;

		// Auth.getUser()
		// 	.then(function(data) {
		// 		PostsDisplay.getUserId(data.data._id)
		// 			.success(function(data) {
		// 				vm.userData = data;
		// 			});
		// 	});

		vm.selected = "";

		vm.getSelected = function() {
			vm.selected = PostsOptions.getSelected();
		};
		vm.setSelected = function(value) {
      PostsOptions.setSelected(value);
			vm.selected = PostsOptions.getSelected(value);
    };


		// PostsDisplay.all()
		// 	.success(function(data) {
		// 		vm.processing = false;
		// 		vm.posts = data;
		// 	});

		PostsDisplay.getId()
			.success(function(data) {
				vm.processing = false;
				vm.posts = data;
				console.log($state.params);
			});
	});
