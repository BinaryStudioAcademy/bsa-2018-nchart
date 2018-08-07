const async = require('async');
const UserRepository = require('./user.repository');
const CompanyService = require('../company/company.service');
const CompanyUserService = require('../company/company_user/company_user.service');
const GroupService = require('../group/group.service');
const GroupUserService = require('../group/group_user/group_user.service');

module.exports = {
	findAll: callback => {
		UserRepository.getAll((err, data) => {
			callback(null, data);
		});
	},

	findById: (id, callback) => {
		UserRepository.getById(id, (err, data) => {
			callback(err, data);
		});
	},

	save: (obj, mainCallBack) => {
		// object with all created entities
		const payload = {
			user: null,
			company: null,
			companyUser: null,
			group: null,
			groupUser: null
		};
		async.waterfall(
			[
				callback => {
					UserRepository.findByEmail(obj, (err, data) => {
						if (err) {
							return callback(err, null);
						}
						if (data === null) {
							return callback(null);
						}
						throw new Error('User already exists');
					});
				},
				callback => {
					UserRepository.save(obj, (err, data) => {
						if (err) {
							return callback(err, null);
						}
						payload.user = data;
						return callback(null);
					});
				},
				callback => {
					GroupService.save('General', (err, data) => {
						if (err) {
							return callback(err, null);
						}
						payload.group = data;
						return callback(null);
					});
				},
				callback => {
					GroupUserService.save(
						payload.user.id,
						payload.group.id,
						(err, data) => {
							if (err) {
								return callback(err, null);
							}
							payload.groupUser = data;
							return callback(null);
						}
					);
				},
				callback => {
					CompanyService.save(obj, (err, data) => {
						if (err) {
							return callback(err, null);
						}
						payload.company = data;
						return callback(null);
					});
				},
				callback => {
					CompanyUserService.save(
						payload.user.id,
						payload.company.id,
						(err, data) => {
							if (err) {
								return callback(err, null);
							}
							payload.companyUser = data;
							return callback(null);
						}
					);
				}
			],
			err => {
				if (err) {
					mainCallBack(err, null);
					throw err;
				}
				return mainCallBack(null, payload);
			}
		);
	},

	login: (obj, callback) => {
		UserRepository.login(obj, (err, data) => {
			callback(err, data);
		});
	},

	removeById: (id, callback) => {
		UserRepository.removeById(id, (err, data) => {
			callback(err, data);
		});
	},

	update: (id, obj, callback) => {
		UserRepository.update(id, obj, (err, data) => {
			callback(err, data);
		});
	}
};

/*
UserRepository.findByEmail(obj, (err, data) => {
            if (err) {
                callback(err, null);
            } else if (data === null) {
                UserRepository.save(obj, (err, data) => {
                    if (err) {
                        callback(err, data);
                        throw err;
                    }
                    payload.user = Object.assign({}, data);
                    GroupService.save('General', (err, data) => {
                        if (err) {
                            callback(err, data);
                            throw err;
                        }
                        payload.group = Object.assign({}, data);
                        GroupUserService.save(
                            payload.user.id,
                            payload.group.id,
                            (err, data) => {
                                if (err) {
                                    callback(err, data);
                                    throw err;
                                }
                                payload.group_user = Object.assign({}, data);
                                CompanyService.save(obj, (err, data) => {
                                    if (err) {
                                        callback(err, data);
                                        throw err;
                                    }
                                    payload.company = Object.assign({}, data);
                                    CompanyUserService.save(
                                        payload.user.id,
                                        payload.company.id,
                                        (err, data) => {
                                            if (err) {
                                                callback(err, data);
                                                throw err;
                                            }
                                            payload.company_user = Object.assign(
                                                {},
                                                data,
                                            );
                                            callback(null, payload);
                                        },
                                    );
                                });
                            },
                        );
                    });
                });
            }
        });
 */
