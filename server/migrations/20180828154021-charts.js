const async = require('async');

module.exports = {
	up: (queryInterface, Sequelize) => new Promise((resolve, reject) => {
		async.waterfall(
			[
				callback => {
					queryInterface
						.dropTable('projectCharts')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('charts')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.createTable('charts', {
							id: {
								allowNull: false,
								primaryKey: true,
								type: Sequelize.STRING
							},
							chartTypeId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'chartTypes',
									key: 'id'
								}
							},
							dimensionSettings: {
								type: Sequelize.JSON
							},
							customizeSettings: {
								type: Sequelize.JSON
							},
							datasetId: {
								type: Sequelize.STRING,
								references: { model: 'datasets', key: 'id' }
							},
							createdAt: {
								allowNull: false,
								type: Sequelize.DATE
							},
							updatedAt: {
								allowNull: false,
								type: Sequelize.DATE
							}
						})
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.createTable('projectCharts', {
							chartId: {
								type: Sequelize.STRING,
								primaryKey: true,
								references: { model: 'charts', key: 'id' }
							},
							projectId: {
								type: Sequelize.INTEGER,
								primaryKey: true,
								references: { model: 'projects', key: 'id' }
							},
							createdAt: {
								allowNull: false,
								type: Sequelize.DATE
							},
							updatedAt: {
								allowNull: false,
								type: Sequelize.DATE
							}
						})
						.then(() => callback(null))
						.catch(err => callback(err, null));
				}
			], (err, payload) => {
				if (err) {
					reject(err);
				}
				resolve(payload);
			}
		);
	}),

	down: (queryInterface, Sequelize) => new Promise((resolve, reject) => {
		async.waterfall(
			[
				callback => {
					queryInterface
						.dropTable('projectCharts')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('charts')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.createTable('charts', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							chartTypeId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'chartTypes',
									key: 'id'
								}
							},
							dimensionSettings: {
								type: Sequelize.JSON
							},
							customizeSettings: {
								type: Sequelize.JSON
							},
							datasetId: {
								type: Sequelize.STRING,
								references: { model: 'datasets', key: 'id' }
							},
							createdAt: {
								allowNull: false,
								type: Sequelize.DATE
							},
							updatedAt: {
								allowNull: false,
								type: Sequelize.DATE
							}
						})
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.createTable('projectCharts', {
							chartId: {
								type: Sequelize.INTEGER,
								primaryKey: true,
								references: { model: 'charts', key: 'id' }
							},
							projectId: {
								type: Sequelize.INTEGER,
								primaryKey: true,
								references: { model: 'projects', key: 'id' }
							},
							createdAt: {
								allowNull: false,
								type: Sequelize.DATE
							},
							updatedAt: {
								allowNull: false,
								type: Sequelize.DATE
							}
						})
						.then(() => callback(null))
						.catch(err => callback(err, null));
				}
			], (err, payload) => {
				if (err) {
					reject(err);
				}
				resolve(payload);
			}
		);
	})
};
