const ProjectRepository = require('./project.repository');

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}
}

module.exports = new ProjectService();
