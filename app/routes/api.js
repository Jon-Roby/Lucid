var bodyParser = require('body-parser');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config/auth.js');
var secret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	apiRouter.post('/authenticate', function(req, res) {

	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({
	      	success: false,
	      	message: 'Authentication failed. User not found.'
	    	});
	    } else if (user) {

	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({
	        	success: false,
	        	message: 'Authentication failed. Wrong password.'
	      	});

	      } else {

	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username,
						_id: user._id
	        }, secret, {
	          expiresInMinutes: 1440
	        });

	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }

	    }

	  });
	});

	apiRouter.post('/register', function(req, res) {

		var user = new User();
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;

		user.save(function(err) {
			if (err) {
				// duplicate entry
				if (err.code == 11000)
					return res.json({ success: false, message: 'A user with that username already exists. '});
				else
					return res.send(err);
			}

			var token = jwt.sign({
				name: user.name,
				username: user.username,
				_id: user._id
			}, secret, {
				expiresInMinutes: 1440
			});

			res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});

		});
	});


	apiRouter.use(function(req, res, next) {
		console.log('!');
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  if (token) {

	    jwt.verify(token, secret, function(err, decoded) {

	      if (err) {
	        res.status(403).send({
	        	success: false,
	        	message: 'Failed to authenticate token.'
	    		});
	      } else {
	        req.decoded = decoded;
	        next();
	      }
	    });
	  } else {
      res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
	  }
	});

  return apiRouter;
};
