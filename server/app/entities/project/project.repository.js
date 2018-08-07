const generalRepository = require('../generalRepository');
const projectModel = require('../../models/project/project');

class ProjectRepository extends generalRepository {
	constructor() {
		super();
		this.model = projectModel;
	}
}

module.exports = new ProjectRepository();
