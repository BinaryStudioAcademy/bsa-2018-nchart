require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('./config').development;

module.exports = new Sequelize(
	`postgres://${config.username}:${config.password}@${config.host}:${
		config.port
	}/${config.database}`
);
