const Sequelize = require('sequelize');

const config = {
	user: 'postgres',
	host: 'localhost',
	database: 'nchart',
	password: 'admin',
	port: 5432
};

module.exports = new Sequelize(
	`postgres://${config.user}:${config.password}@${config.host}:${
		config.port
	}/${config.database}`
);
