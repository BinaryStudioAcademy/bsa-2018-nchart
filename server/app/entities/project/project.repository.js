const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');

class ProjectRepository extends Repository {
	constructor() {
		super();
		this.model = projectModel;
	}

	upsert(obj) {
		return this.model.upsert({ id: obj.id, name: obj.name });
	}
}

module.exports = new ProjectRepository();
