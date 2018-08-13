const sequelize = require('../config/index');

function DBConnectionHandler() {
	sequelize
		.authenticate()
		.then(() => 'Connection has been established successfully.')
		.catch(err => {
			throw err;
		});
}

module.exports = DBConnectionHandler;
