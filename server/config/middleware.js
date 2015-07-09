var morgan = require('morgan');
var bodyParser = require('body-parser');
// var passport = require('passport');
// var GITHUB_INFO = require('../oauth.js');
// var GitHubStrategy = require('passport-github2').Strategy;
// var session = require('express-session');


module.exports = function(app, express){
	
	//express middleware and url parsers
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	if(process.env.ENVIRONMENT === "PRODUCTION") {
		app.use(express.static('client/public/build'));
	} else {
		app.use(express.static('client/public/dist'));
	}

	//content routes and middleware 
	var contentRouter = express.Router();
	// app.use('/api/lesson', contentRouter);
	// require('../content/contentRoutes.js')(contentRouter);

};