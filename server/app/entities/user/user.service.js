const async = require('async');
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
		return this.UserRepository.getById(id);
	}

	save(obj) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.UserRepository.save(obj)
							.then(data =>
								callback(null, {
									token: TokenService.createToken(data),
									user: data.dataValues
								})
							)
							.catch(err =>
								callback(err.errors[0].message, null)
							);
					},
					(payload, callback) => {
						GroupService.saveGroup('General')
							.then(data =>
								callback(
									null,
									Object.assign({}, payload, {
										group: data.dataValues
									})
								)
							)
							.catch(err =>
								callback(err.errors[0].message, null)
							);
					},
					(payload, callback) => {
						GroupService.saveGroupUser(
							payload.user.id,
							payload.group.id
						)
							.then(data =>
								callback(
									null,
									Object.assign({}, payload, {
										groupUser: data.dataValues
									})
								)
							)
							.catch(err =>
								callback(err.errors[0].message, null)
							);
					},
					(payload, callback) => {
						CompanyService.saveCompany(obj)
							.then(data =>
								callback(
									null,
									Object.assign({}, payload, {
										company: data.dataValues
									})
								)
							)
							.catch(err => {
								callback(err.errors[0].message, null);
							});
					},
					(payload, callback) => {
						CompanyService.saveCompanyUser(
							payload.user.id,
							payload.company.id
						)
							.then(data =>
								callback(
									null,
									Object.assign({}, payload, {
										companyUser: data.dataValues
									})
								)
							)
							.catch(err => {
								callback(err.errors[0].message, null);
							});
					}
				],
				(err, payload) => {
					if (err) {
						return reject(err);
					}
					// console.log(payload);
					return resolve(payload.token);
				}
			);
		});
	}

	login(obj) {
		return this.UserRepository.findByEmail(obj)
			.then(data => {
				if (data === null) {
					throw new Error('User does not exist');
				} else if (data.dataValues.password === obj.password) {
					return TokenService.createToken(data.dataValues);
				} else {
					throw new Error('Wrong password');
				}
			})
			.catch(err => {
				throw new Error(err);
			});
	}

	removeById(id) {
		return this.UserRepository.removeById(id)
			.then(data => {
				if (data === 0) {
					throw new Error('Object did not exist');
				} else {
					return 'Object deleted';
				}
			})
			.catch(err => {
				throw new Error(err);
			});
	}

	updateUser(id, obj) {
		return this.UserRepository.update(id, obj)
			.then(data => {
				if (data[0] === 0) {
					throw new Error('Object does not exist');
				}
				return 'Object updated';
			})
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = new UserService();
