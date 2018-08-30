require('dotenv').config();

const exportConfig = id => ({
	host: process.env.EXPORT_HOST,
	port: process.env.EXPORT_PORT,
	path: `${process.env.EXPORT_PATH}/${id}/pdf_preview`
});

const connectionConfig = {
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT
};

module.exports = {
	development: connectionConfig,
	test: connectionConfig,
	production: connectionConfig,
	exportUrl: exportConfig
};
