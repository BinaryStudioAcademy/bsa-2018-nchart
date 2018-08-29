require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../config/config').development;

module.exports = new Sequelize({
	...config,
	logging: false
});
