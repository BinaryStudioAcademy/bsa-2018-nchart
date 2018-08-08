const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');

class ProjectRepository extends Repository {
	constructor() {
		super();
		this.model = projectModel;
	}
}

module.exports = new ProjectRepository();
