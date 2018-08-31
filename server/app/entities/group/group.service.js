const async = require('async');
const _ = require('lodash');
const GroupRepository = require('./group.repository');
const CompanyService = require('../company/company.service');

class GroupService {
	constructor() {
		this.GroupRepository = GroupRepository;
	}

	saveGroup(obj) {
		return this.GroupRepository.saveGroup(obj);
	}

	saveFullGroup(obj, res) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						CompanyService.findCompanyUsers({
							userId: res.locals.user.id,
							companyId: obj.companyId
						})
							.then(data => {
								if (data !== null) {
									return callback(null);
								}
								throw new Error(
									'Company does not belong to user'
								);
							})
							.catch(err => callback(err, null));
					},
					callback => {
						// check name duplicates
						this.GroupRepository.findUserGroupByName({
							userId: res.locals.user.id,
							name: obj.name,
							companyId: obj.companyId
						})
							.then(data => {
								if (data.length === 0) {
									return callback(null);
								}
								throw new Error(
									'Folder with such name already exists'
								);
							})
							.catch(err => callback(err, null));
					},
					callback => {
						this.GroupRepository.saveGroup(obj)
							.then(data => callback(null, data.dataValues))
							.catch(err => callback(err, null));
					},
					(group, callback) => {
						this.GroupRepository.saveGroupUser({
							groupId: group.id,
							userId: res.locals.user.id,
							defaultGroup: false
						})
							.then(() => callback(null, _.omit(group, 'updatedAt')))
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
		});
	}

	saveGroupUser(obj) {
		return this.GroupRepository.saveGroupUser(obj);
	}

	saveGroupProject(obj) {
		return this.GroupRepository.saveGroupProject(obj);
	}

	findOneGroupUser(query) {
		return this.GroupRepository.findOneGroupUser(query);
	}

	findOneGroupProject(query) {
		return this.GroupRepository.findOneGroupProject(query);
	}

	findAllByQuery(query) {
		return this.GroupRepository.findAllGroupUser(query);
	}

	findAllUserGroups(res) {
		return this.GroupRepository.findAllUserGroups(res.locals.user.id).then(
			data => {
				const payload = [];
				data.forEach(el => {
					payload.push(el.group.dataValues);
				});
				return payload;
			}
		);
	}
}

module.exports = new GroupService();
