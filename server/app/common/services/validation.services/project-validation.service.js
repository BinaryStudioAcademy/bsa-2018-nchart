const schemaValidationService = require('../schema-validation.service');
const projectSchema = require('../../../entities/project/project.schemas/projects.schema');
const datasetSchema = require('../../../entities/dataset/dataset.schema');
const chartSchema = require('../../../entities/chart/chart.schema');

function projectValidationService(obj) {
	const errors = [];
	const result = schemaValidationService({ id: obj.id, name: obj.name }, projectSchema);
	if (result !== null) {
		errors.push(result);
	}
	obj.datasets.forEach(el => {
		const response = schemaValidationService(el, datasetSchema);
		if (response !== null) {
			response.forEach(err => errors.push(err));
		}
	});
	obj.charts.forEach(el => {
		const response = schemaValidationService(el, chartSchema);
		if (response !== null) {
			response.forEach(err => errors.push(err));
		}
	});
	return errors;
}

module.exports = projectValidationService;
