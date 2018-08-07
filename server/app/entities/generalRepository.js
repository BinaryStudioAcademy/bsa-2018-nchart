class Repository {
	constructor(model) {
		this.model = model;
	}

	getAll(callback) {
		this.model
			.findAll()
			.then(data => {
				callback(null, data);
			})
			.catch(err => {
				callback(err, null);
			});
	}

	save(obj, callback) {
		this.model
			.create(obj)
			.then(() => {
				callback(null, obj);
			})
			.catch(err => callback(err, obj));
	}

	getById(id, callback) {
		this.model
			.findById(id)
			.then(data => {
				callback(null, data);
			})
			.catch(err => callback(err, null));
	}

	removeById(id, callback) {
		this.model
			.destroy({
				where: {
					id
				}
			})
			.then(() => {
				callback(null, 'Object deleted');
			})
			.catch(err => callback(err, null));
	}

	update(id, obj, callback) {
		this.model
			.update(obj, {
				where: {
					id
				}
			})
			.then(() => {
				callback(null, obj);
			})
			.catch(err => callback(err, obj));
	}
}

module.exports = Repository;
