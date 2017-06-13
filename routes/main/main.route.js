'use strict';

module.exports = function(app) {
	console.log('main route loading!');
	// Root routing
	var main = require('../../controllers/main/main.index.controller');
	app.route('/jj').get(main.index);
    app.route('/hc').get(main.index2);
    app.route('/').get(main.index);
    app.route('/signin').get(main.signin);
    app.route('/signup').get(main.signup);
    app.route('/sign').post(main.sign);
    app.route('/login').post(main.login);
    app.route('/logout').get(main.logout);
};
