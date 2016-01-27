angular.module("myApp",["app.routes","ngAnimate","angularMoment","authService","mainCtrl","postsDisplayCtrl","postsDisplayService","iconsCtrl","iconsService","userSidebarCtrl","userSidebarService","postDisplayCtrl","postDisplayService","postAuthorCtrl","postAuthorService","postCreateCtrl","postCreateService","userDisplayCtrl","userDisplayService"]).config(["$httpProvider",function(t){t.interceptors.push("AuthInterceptor")}]),angular.module("app.routes",["ui.router"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(t,e,s){e.otherwise("/"),t.state("login",{url:"/login",templateUrl:"app/views/pages/users/login.html",controller:"mainController",controllerAs:"login"}).state("signup",{url:"/signup",templateUrl:"app/views/pages/users/signup.html",controller:"mainController",controllerAs:"signup"}).state("users",{url:"/users",templateUrl:"app/views/pages/users/all.html",controller:"userController",controllerAs:"user"}).state("posts-trending",{url:"/posts/trending",views:{"":{templateUrl:"app/components/postsDisplay/postsDisplayLayout.html"},"postsDisplay@posts-trending":{templateUrl:"app/components/postsDisplay/postsDisplayView.html",controller:"postsDisplayController",controllerAs:"postsDisplay"},"icons@posts-trending":{templateUrl:"app/components/icons/iconsView.html",controller:"iconsController",controllerAs:"icons"},"menu@posts-trending":{templateUrl:"app/components/userSidebar/userSidebarView.html",controller:"userSidebarController",controllerAs:"menu"}}}).state("posts-popular",{url:"/posts/popular",views:{"":{templateUrl:"app/components/postsDisplay/postsDisplayLayout.html"},"postsDisplay@posts-popular":{templateUrl:"app/components/postsDisplay/postsDisplayView.html",controller:"postsDisplayController",controllerAs:"postsDisplay"},"icons@posts-popular":{templateUrl:"app/components/icons/iconsView.html",controller:"iconsController",controllerAs:"icons"},"menu@posts-popular":{templateUrl:"app/components/userSidebar/userSidebarView.html",controller:"userSidebarController",controllerAs:"menu"}}}).state("posts-new",{url:"/posts/new",views:{"":{templateUrl:"app/components/postsDisplay/postsDisplayLayout.html"},"postsDisplay@posts-new":{templateUrl:"app/components/postsDisplay/postsDisplayView.html",controller:"postsDisplayController",controllerAs:"postsDisplay"},"icons@posts-new":{templateUrl:"app/components/icons/iconsView.html",controller:"iconsController",controllerAs:"icons"},"menu@posts-new":{templateUrl:"app/components/userSidebar/userSidebarView.html",controller:"userSidebarController",controllerAs:"menu"}}}).state("postCreate",{url:"/posts/create",templateUrl:"app/components/postCreate/postCreateView.html",controller:"postCreateController",controllerAs:"post"}).state("post",{url:"/posts/:post_id",views:{"":{templateUrl:"app/components/postDisplay/postDisplayLayout.html"},"postDisplay@post":{templateUrl:"app/components/postDisplay/postDisplayView.html",controller:"postDisplayController",controllerAs:"postDisplay"},"postDetails@post":{templateUrl:"app/components/postDisplay/postDisplayDetails.html",controller:"postDisplayController",controllerAs:"postDisplay"},"postAuthor@post":{templateUrl:"app/components/postAuthor/postAuthorView.html",controller:"postAuthorController",controllerAs:"postAuthor"},"menu@post":{templateUrl:"app/components/userSidebar/userSidebarView.html",controller:"userSidebarController",controllerAs:"menu"}}}).state("postEdit",{url:"/posts/:post_id/edit",templateUrl:"app/components/postCreate/postCreateView.html",controller:"postEditController",controllerAs:"post"}).state("profile",{url:"/users/:user_id",templateUrl:"app/components/userDisplay/userDisplayView.html",controller:"userDisplayController",controllerAs:"user"}),s.html5Mode(!0)}]),angular.module("authService",[]).factory("Auth",["$http","$q","AuthToken",function(t,e,s){var o={};return o.register=function(e,o,r){return t.post("api/register",{name:e,username:o,password:r}).success(function(t){return s.setToken(t.token),t})},o.login=function(e,o){return t.post("/api/authenticate",{username:e,password:o}).success(function(t){return s.setToken(t.token),t})},o.logout=function(){s.setToken()},o.isLoggedIn=function(){return s.getToken()?!0:!1},o.getUser=function(){return s.getToken()?t.get("/api/me",{cache:!0}):e.reject({message:"User has no token."})},o}]).factory("AuthToken",["$window",function(t){var e={};return e.getToken=function(){return t.localStorage.getItem("token")},e.setToken=function(e){e?t.localStorage.setItem("token",e):t.localStorage.removeItem("token")},e}]).factory("AuthInterceptor",["$q","$location","AuthToken",function(t,e,s){var o={};return o.request=function(t){var e=s.getToken();return e&&(t.headers["x-access-token"]=e),t},o.responseError=function(o){return 403==o.status&&(s.setToken(),e.path("/login")),t.reject(o)},o}]),angular.module("postService",[]).factory("Post",["$http",function(t){var e={};return e.all=function(){return t.get("/api/posts/")},e.get=function(e){return t.get("/api/posts/"+e)},e.getUserId=function(e){return t.get("/api/users/"+e)},e.upvotePost=function(e){return t.put("/api/posts/"+e+"/upvote")},e.bookmark=function(e,s){return t.put("/api/users/"+e+"/bookmark",s)},e.subscribeToAuthor=function(e,s){return t.put("/api/users/"+e._id+"/subscribe",s)},e.getIcons=function(){return t.get("api/users/icons")},e.create=function(e){return t.post("/api/posts/",e)},e.update=function(e,s){return t.put("/api/posts/post/"+e,s)},e["delete"]=function(e){return t["delete"]("/api/posts/post/"+e)},e}]),angular.module("userService",[]).factory("User",["$http",function(t){var e={};return e.get=function(e){return t.get("/api/users/"+e)},e.all=function(){return t.get("/api/users/")},e.create=function(e){return t.post("/api/users/",e)},e.update=function(e,s){return t.put("/api/users/"+e,s)},e["delete"]=function(e){return t["delete"]("/api/users/"+e)},e}]),angular.module("mainCtrl",[]).controller("mainController",["$rootScope","$location","Auth","$state",function(t,e,s,o){var r=this;r.loggedIn=s.isLoggedIn(),t.$on("$routeChangeStart",function(){r.loggedIn=s.isLoggedIn(),s.getUser().then(function(t){r.user=t.data})}),r.selected="","/posts/trending"===e.path()?r.sliderMargin="navbar-options-left":"/posts/popular"===e.path()?r.sliderMargin="navbar-options-middle":"/posts/new"===e.path()?r.sliderMargin="navbar-options-right":r.sliderMargin="navbar-options-none",r.switchPage=function(t){o.go(t)},r.signup=function(){r.processing=!0,r.error="",s.register(r.loginData.name,r.loginData.username,r.loginData.password).success(function(t){r.processing=!1,t.success?e.path("/posts"):r.error=t.message})},r.login=function(){r.processing=!0,r.error="",s.logout(),s.login(r.loginData.username,r.loginData.password).success(function(t){r.processing=!1,t.success?e.path("/posts"):r.error=t.message})},r.logout=function(){s.logout(),r.user=""}}]),angular.module("userDisplayCtrl",["userService"]).controller("userDisplayController",["User",function(t){var e=this;e.processing=!0,t.all().success(function(t){e.processing=!1,e.users=t}),e.deleteUser=function(s){e.processing=!0,t["delete"](s).success(function(s){t.all().success(function(t){e.processing=!1,e.users=t})})}}]).controller("userCreateController",["User",function(t){var e=this;e.type="create",e.saveUser=function(){e.processing=!0,e.message="",t.create(e.userData).success(function(t){e.processing=!1,e.userData={},e.message=t.message})}}]).controller("userEditController",["$routeParams","User",function(t,e){var s=this;s.type="edit",e.get(t.user_id).success(function(t){s.userData=t}),s.saveUser=function(){s.processing=!0,s.message="",e.update(t.user_id,s.userData).success(function(t){s.processing=!1,s.userData={},s.message=t.message})}}]).controller("userProfileController",["$routeParams","User",function(t,e){var s=this;s.processing=!0,e.get(t.user_id).success(function(t){s.userData=t}),s.deleteUser=function(t){s.processing=!0,e["delete"](t).success(function(t){e.all().success(function(t){s.processing=!1,s.users=t})})}}]),angular.module("iconsCtrl",["iconsService"]).controller("iconsController",["Icons","Auth",function(t,e){var s=this;s.processing=!0,t.getIcons().success(function(t){s.icons=t})}]),angular.module("iconsService",[]).factory("Icons",["$http",function(t){var e={};return e.getIcons=function(){return t.get("api/users/icons")},e}]),angular.module("postCreateCtrl",["postCreateService"]).controller("postCreateController",["PostCreate",function(t){var e=this;e.type="create",e.savePost=function(){e.processing=!0,e.message="",t.create(e.postData).success(function(t){e.processing=!1,e.postData={},e.message=t.message})}}]).controller("postEditController",["$stateParams","PostCreate",function(t,e){var s=this;s.type="edit",e.get(t.post_id).success(function(t){s.postData=t}),s.savePost=function(){s.processing=!0,s.message="",e.update(t.post_id,s.postData).success(function(t){s.processing=!1,s.postData={},s.message=t.message})}}]),angular.module("postCreateService",[]).factory("PostCreate",["$http",function(t){var e={};return e.get=function(e){return t.get("/api/posts/"+e)},e.getUserId=function(e){return t.get("/api/users/"+e)},e.create=function(e){return t.post("/api/posts/",e)},e.update=function(e,s){return t.put("/api/posts/"+e,s)},e["delete"]=function(e){return t["delete"]("/api/posts/"+e)},e}]),angular.module("postAuthorCtrl",["postAuthorService"]).controller("postAuthorController",["PostAuthor","Auth","$stateParams",function(t,e,s){var o=this;o.processing=!0,e.getUser().then(function(e){t.getUserId(e.data._id).success(function(t){o.userData=t})}),t.get(s.post_id).success(function(e){o.post=e,t.getUserId(o.post.authorId).success(function(t){o.post.userData=t})}),o.subscribeToAuthor=function(){t.subscribeToAuthor(o.userData,o.post).success(function(s){e.getUser().then(function(e){t.getUserId(e.data._id).success(function(t){o.userData=t})})})}}]),angular.module("postAuthorService",[]).factory("PostAuthor",["$http",function(t){var e={};return e.get=function(e){return t.get("/api/posts/"+e)},e.getUserId=function(e){return t.get("/api/users/"+e)},e.subscribeToAuthor=function(e,s){return t.put("/api/users/"+e._id+"/subscribe",s)},e}]),angular.module("postDisplayCtrl",["postDisplayService"]).controller("postDisplayController",["$stateParams","PostDisplay","Auth",function(t,e,s){var o=this;s.getUser().then(function(t){e.getUserId(t.data._id).success(function(t){o.userData=t})}),e.get(t.post_id).success(function(t){o.post=t}),o.deletePost=function(t){o.userData._id===o.post.authorId&&e["delete"](t).success(function(t){e.all().success(function(t){o.processing=!1,o.posts=t})})},o.upvotePost=function(){console.log(o.post._id),e.upvotePost(o.post._id).success(function(s){e.get(t.post_id).success(function(t){o.post=t})})},o.bookmark=function(){e.bookmark(o.userData._id,o.post).success(function(t){s.getUser().then(function(t){e.getUserId(t.data._id).success(function(t){o.userData=t})})})},o.subscribeToAuthor=function(){e.subscribeToAuthor(o.userData,o.post).success(function(t){s.getUser().then(function(t){e.getUserId(t.data._id).success(function(t){o.userData=t})})})}}]),angular.module("postDisplayService",[]).factory("PostDisplay",["$http",function(t){var e={};return e.get=function(e){return t.get("/api/posts/"+e)},e.getUserId=function(e){return t.get("/api/users/"+e)},e.upvotePost=function(e){return t.put("/api/posts/"+e+"/upvote")},e.bookmark=function(e,s){return t.put("/api/users/"+e+"/bookmark",s)},e["delete"]=function(e){return t["delete"]("/api/posts/post/"+e)},e}]),angular.module("postsDisplayCtrl",["postsDisplayService"]).controller("postsDisplayController",["PostsDisplay","Auth","$location",function(t,e,s){var o=this;o.processing=!0,"/posts/trending"===s.path()?t.getTrendingPosts().success(function(t){o.processing=!1,o.posts=t}):"/posts/popular"===s.path()?t.getPopularPosts().success(function(t){o.processing=!1,o.posts=t}):"/posts/new"===s.path()?t.getNewPosts().success(function(t){o.processing=!1,o.posts=t}):console.log("hello")}]),angular.module("postsDisplayService",[]).factory("PostsDisplay",["$http",function(t){var e={};return e.all=function(){return t.get("/api/posts/")},e.getTrendingPosts=function(){return t.get("/api/posts/trending")},e.getPopularPosts=function(){return t.get("/api/posts/popular")},e.getNewPosts=function(){return t.get("/api/posts/new")},e}]),angular.module("userDisplayCtrl",["userDisplayService"]).controller("userDisplayController",["UserDisplay","$stateParams",function(t,e){var s=this;s.processing=!0,t.get(e.user_id).success(function(t){s.userData=t})}]),angular.module("userDisplayService",[]).factory("UserDisplay",["$http",function(t){var e={};return e.get=function(e){return t.get("/api/users/"+e)},e.all=function(){return t.get("/api/users/")},e.create=function(e){return t.post("/api/users/",e)},e.update=function(e,s){return t.put("/api/users/"+e,s)},e["delete"]=function(e){return t["delete"]("/api/users/"+e)},e}]),angular.module("userSidebarCtrl",["userSidebarService"]).controller("userSidebarController",["UserSidebar","Auth",function(t,e){var s=this;s.processing=!0,e.getUser().then(function(e){t.getUserId(e.data._id).success(function(t){console.log(t),s.userData=t})})}]),angular.module("userSidebarService",[]).factory("UserSidebar",["$http",function(t){var e={};return e.getUserId=function(e){return t.get("/api/users/"+e)},e}]);