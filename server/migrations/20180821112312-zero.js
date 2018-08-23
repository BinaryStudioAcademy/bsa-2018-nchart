const async = require('async');

module.exports = {
	up: (queryInterface, Sequelize) => new Promise((resolve, reject) => {
		async.waterfall(
			[
				callback => {
					queryInterface
						.createTable('companies', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							name: {
								type: Sequelize.STRING
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
						.createTable('groups', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							name: {
								type: Sequelize.STRING
							},
							companyId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'companies',
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
				},
				callback => {
					queryInterface
						.createTable('users', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							name: {
								type: Sequelize.STRING,
								allowNull: false,
								validate: {
									is: {
										args: /^[a-zа-яэіїє]+$/i,
										msg: 'Not valid name'
									}
								}
							},
							email: {
								type: Sequelize.STRING,
								allowNull: false,
								unique: true,
								validate: {
									isEmail: { msg: 'Not valid email' }
								}
							},
							password: {
								type: Sequelize.STRING,
								allowNull: false
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
						.createTable('projects', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							name: {
								type: Sequelize.STRING
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
						.createTable('chartTypes', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							type: {
								type: Sequelize.STRING
							},
							name: {
								type: Sequelize.STRING
							},
							sysName: {
								type: Sequelize.STRING
							},
							description: {
								type: Sequelize.STRING
							},
							dimensionSettings: {
								type: Sequelize.JSON
							},
							customizeSettings: {
								type: Sequelize.JSON
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
						.createTable('datasets', {
							id: {
								allowNull: false,
								primaryKey: true,
								type: Sequelize.STRING
							},
							columns: {
								type: Sequelize.JSON
							},
							data: {
								type: Sequelize.JSON
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
						.createTable('accessTypes', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							accessLevel: {
								type: Sequelize.STRING
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
						.createTable('companyUsers', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							userId: {
								type: Sequelize.INTEGER,
								references: { model: 'users', key: 'id' }
							},
							companyId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'companies',
									key: 'id'
								}
							},
							isAdmin: {
								type: Sequelize.BOOLEAN
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
						.createTable('groupUsers', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							groupId: {
								type: Sequelize.INTEGER,
								references: { model: 'groups', key: 'id' }
							},
							userId: {
								type: Sequelize.INTEGER,
								references: { model: 'users', key: 'id' }
							},
                            defaultGroup: {
                                type: Sequelize.BOOLEAN,
                                allowNull: false
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
								references: { model: 'projects', key: 'id' },
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
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							chartId: {
								type: Sequelize.INTEGER,
								references: { model: 'charts', key: 'id' }
							},
							projectId: {
								type: Sequelize.INTEGER,
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
				},
				callback => {
					queryInterface
						.createTable('companyChartTypes', {
							id: {
								allowNull: false,
								autoIncrement: true,
								primaryKey: true,
								type: Sequelize.INTEGER
							},
							companyId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'companies',
									key: 'id'
								}
							},
							chartTypeId: {
								type: Sequelize.INTEGER,
								references: {
									model: 'chartTypes',
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
			],
			(err, payload) => {
				if (err) {
					reject(err);
				}
				resolve(payload);
			}
		);
	}),
	down: queryInterface => new Promise((resolve, reject) => {
		// order of the deletion callbacks determined by table's hookups
		async.waterfall(
			[
				callback => {
					queryInterface
						.dropTable('companyChartTypes')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
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
						.dropTable('groupProjects')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('groupUsers')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('companyUsers')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('accessTypes')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('datasets')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('chartTypes')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('projects')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('users')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('groups')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				},
				callback => {
					queryInterface
						.dropTable('companies')
						.then(() => callback(null))
						.catch(err => callback(err, null));
				}
			],
			(err, payload) => {
				if (err) {
					reject(err);
				}
				resolve(payload);
			}
		);
	})
};
