const ProjectRepository = require('./project.repository');
const ExportService = require('../../common/services/export.services/export.service');

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
		this.ExportService = ExportService;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}

	export(id, type) {
		return this.ExportService.getFile(id, type);
	}
}

module.exports = new ProjectService();
