const Repository = require('../../common/repository/repository');
const chartTypeModel = require('./chartType.model');

class ChartTypeRepository extends Repository {
	constructor() {
		super();
		this.model = chartTypeModel;
	}

	getAll() {
		return this.model.findAll({});
	}

	getById(id) {
		return this.model.findById(id, {
			attributes: [
				'id',
				'name',
				'sysName',
				'description',
				'dimensionSettings',
				'customizeSettings'
			]
		});
	}
}

module.exports = new ChartTypeRepository();
