const generalRepository = require('../../common/repository/Repository');
const projectModel = require('./project.models/project');

class ProjectRepository extends generalRepository {
	constructor() {
		super();
		this.model = projectModel;
	}
}

module.exports = new ProjectRepository();
