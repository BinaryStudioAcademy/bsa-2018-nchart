require('dotenv').config();
const Sequelize = require('sequelize');

const config = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT
};

module.exports = new Sequelize(
	`postgres://${config.user}:${config.password}@${config.host}:${
		config.port
	}/${config.database}`
);
