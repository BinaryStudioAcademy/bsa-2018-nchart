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
						UserRepository.findByEmail(obj.user.email)
							.then(data => {
								if (data === null) {
									return callback(null);
								}
								throw new Error('email must be unique');
							})
							.catch(err => callback(err, null));
					},
					callback => {
						CompanyService.saveCompany('General')
							.then(data => callback(null, { company: data.dataValues }))
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
						bcrypt
							.hash(obj.user.password, 10)
							.then(hash => {
								callback(
									null,
									payload,
									Object.assign({}, obj.user, {
										password: hash,
										defaultGroupId: payload.group.id
									})
								);
							})
							.catch(err => callback(err, null));
					},
					(payload, user, callback) => {
						this.UserRepository.save(user)
							.then(data => {
								const userPayload = this.createUserPayload(
									data.dataValues
								);
								callback(
									null,
									Object.assign({}, payload, {
										user: userPayload,
										tokenSecret: TokenService.createToken(
											userPayload
										)
									})
								);
							})
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						CompanyService.saveCompanyUser(
							payload.user.id,
							payload.company.id
						)
							.then(data => callback(
								null,
								Object.assign({}, payload, {
									companyUser: data.dataValues
								})
							))
							.catch(err => {
								callback(err, null);
							});
					},
					(payload, callback) => {
						GroupService.saveGroupUser({
							userId: payload.user.id,
							groupId: payload.group.id,
							defaultGroup: true
						})
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
						user: payload.user
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
									const userPayload = this.createUserPayload(
										data.dataValues
									);
									callback(null, {
										user: userPayload,
										token: TokenService.createToken(
											userPayload
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
					(decoded, callback) => {
						this.UserRepository.findByEmail(decoded.email)
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

	// todo: discuss what's gonna be deleted with user
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

	createUserPayload(data) {
		this.payload = {
			id: data.id,
			name: data.name,
			email: data.email,
			defaultGroupId: data.defaultGroupId
		};
		return this.payload;
	}
}

module.exports = new UserService();
