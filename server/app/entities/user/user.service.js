const async = require('async');
const bcrypt = require('bcrypt');
const UserRepository = require('./user.repository');
const TokenService = require('../../common/services/token.service');
const CompanyService = require('../company/company.service');
const GroupService = require('../group/group.service');

class UserService {
	constructor() {
		this.UserRepository = UserRepository;
	}

	getAll() {
		return this.UserRepository.getAll();
	}

	getById(id) {
		return this.UserRepository.getById(id)
			.then(data => {
				if (data === null) {
					throw new Error('Object did not exist');
				} else {
					return data;
				}
			})
			.catch(err => {
				throw err;
			});
	}

	save(obj) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						bcrypt
							.hash(obj.user.password, 10)
							.then(hash => {
								callback(
									null,
									Object.assign({}, obj.user, {
										password: hash
									})
								);
							})
							.catch(err => callback(err, null));
					},
					(user, callback) => {
						this.UserRepository.save(user)
							.then(data => callback(null, {
								user: this.createUserPayload(
									data.dataValues
								)
							}))
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						CompanyService.saveCompany(obj)
							.then(data => callback(
								null,
								Object.assign({}, payload, {
									company: data.dataValues
								})
							))
							.catch(err => {
								callback(err, null);
							});
					},
					(payload, callback) => {
						CompanyService.saveCompanyUser(
							payload.user.id,
							payload.company.id
						)
							.then(data => callback(
								null,
								Object.assign({}, payload, {
									tokenSecret: TokenService.createToken(
										Object.assign({}, payload.user, {
											groupId: data.dataValues.id
										})
									),
									companyUser: data.dataValues
								})
							))
							.catch(err => {
								callback(err, null);
							});
					},
					(payload, callback) => {
						GroupService.saveGroup({
							name: 'General',
							companyId: payload.company.id
						})
							.then(data => callback(
								null,
								Object.assign({}, payload, {
									group: data.dataValues
								})
							))
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						GroupService.saveGroupUser(
							payload.user.id,
							payload.group.id
						)
							.then(data => callback(
								null,
								Object.assign({}, payload, {
									groupUser: data.dataValues
								})
							))
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						// console.log(err);
						return reject(err);
					}
					// console.log(payload);
					return resolve({
						token: payload.tokenSecret,
						user: payload.user,
						groupId: payload.group.id
					});
				}
			);
		});
	}

	login(obj) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.UserRepository.findByEmail(obj.email)
							.then(data => {
								if (data === null) {
									throw new Error('Object did not exist');
								}
								callback(null, data);
							})
							.catch(err => {
								callback(err, null);
							});
					},
					(data, callback) => {
						bcrypt
							.compare(obj.password, data.dataValues.password)
							.then(res => {
								if (res === true) {
									callback(null, {
										token: TokenService.createToken(
											data.dataValues
										),
										user: this.createUserPayload(
											data.dataValues
										)
									});
								} else {
									throw new Error('Wrong password');
								}
							})
							.catch(err => {
								callback(err, null);
							});
					}
				],
				(err, payload) => {
					if (err) {
						return reject(err);
					}
					return resolve(payload);
				}
			);
		});
	}

	verifyToken(token) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						TokenService.verifyToken(token)
							.then(data => callback(null, data))
							.catch(err => callback(err, null));
					},
					(email, callback) => {
						this.UserRepository.findByEmail(email)
							.then(data => {
								if (data === null) {
									throw new Error('Object did not exist');
								}
								return callback(null, data);
							})
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						return reject(err);
					}
					return resolve(this.createUserPayload(payload));
				}
			);
		});
	}

	removeById(id) {
		return this.UserRepository.removeById(id)
			.then(data => {
				if (data === 0) {
					throw new Error('Object did not exist');
				} else {
					return null;
				}
			})
			.catch(err => {
				throw err;
			});
	}

	updateUser(id, obj) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						bcrypt
							.hash(obj.password, 10)
							.then(hash => {
								callback(
									null,
									Object.assign({}, obj, {
										password: hash
									})
								);
							})
							.catch(err => callback(err, null));
					},
					(user, callback) => {
						this.UserRepository.update(id, user)
							.then(data => {
								if (data === null || data[0] === 0) {
									throw new Error('Object did not exist');
								}
								return callback(null, null);
							})
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						return reject(err);
					}
					return resolve(payload);
				}
			);
		});
	}

	// this must be used in class method...
	createUserPayload(data) {
		this.payload = {
			id: data.id,
			name: data.name,
			email: data.email
		};
		return this.payload;
	}
}

module.exports = new UserService();
