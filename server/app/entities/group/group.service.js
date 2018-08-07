const GroupRepository = require('./group.repository');

module.exports = {
	findAll: callback => {
		GroupRepository.getAll((err, data) => {
			callback(null, data);
		});
	},
	findById: (id, callback) => {
		GroupRepository.getById(id, (err, data) => {
			callback(err, data);
		});
	},
	save: (name, callback) => {
		GroupRepository.save(name, (err, data) => {
			callback(err, data);
		});
	},

	removeById: (id, callback) => {
		GroupRepository.removeById(id, (err, data) => {
			callback(err, data);
		});
	},

	update: (id, obj, callback) => {
		GroupRepository.update(id, obj, (err, data) => {
			callback(err, data);
		});
	}
};
