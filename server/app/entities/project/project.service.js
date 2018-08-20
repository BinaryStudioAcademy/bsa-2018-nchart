const ProjectRepository = require('./project.repository');
const pdfService = require('../../common/services/pdf.service');

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
		this.pdfService = pdfService;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}
}

module.exports = new ProjectService();
