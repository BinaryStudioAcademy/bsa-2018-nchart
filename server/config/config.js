require('dotenv').config();

const connectionConfig = {
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT || "postgres"
};

module.exports = {
	development: connectionConfig,
	test: connectionConfig,
	production: connectionConfig
};
