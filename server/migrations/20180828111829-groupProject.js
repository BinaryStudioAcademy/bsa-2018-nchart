const async = require('async');

module.exports = {
	up: (queryInterface, Sequelize) => new Promise((resolve, reject) => {
		async.waterfall(
			[
				callback => {
					queryInterface
						.dropTable('groupProjects')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.createTable('groupProjects', {
							groupId: {
								type: Sequelize.INTEGER,
								references: { model: 'groups', key: 'id' },
								primaryKey: true
							},
							projectId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'projects',
									key: 'id'
								},
								primaryKey: true
							},
							accessLevelId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'accessTypes',
									key: 'id'
								}
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
						.dropTable('groupProjects')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.createTable('groupProjects', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							groupId: {
								type: Sequelize.INTEGER,
								references: { model: 'groups', key: 'id' },
								primaryKey: true
							},
							projectId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'projects',
									key: 'id'
								},
								primaryKey: true
							},
							accessLevelId: {
								type: Sequelize.INTEGER
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
