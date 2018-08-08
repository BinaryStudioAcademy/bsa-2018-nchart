class Repository {
	constructor(model) {
		this.model = model;
	}

	getAll() {
		return this.model.findAll();
	}

	save(obj) {
		return this.model.create(obj);
	}

	getById(id) {
		return this.model.findById(id);
	}

	removeById(id) {
		return this.model.destroy({
			where: {
				id
			}
		});
	}

	update(id, obj) {
		return this.model.update(obj, {
			where: {
				id
			}
		});
	}
}

module.exports = Repository;
