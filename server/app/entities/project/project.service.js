const ProjectRepository = require('./project.repository');
const exportService = require('../../common/services/export.services/export.service');

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
		this.exportService = exportService;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}

	export(id, type) {
		return this.exportService.getFile(id, type);
	}
}

module.exports = new ProjectService();
