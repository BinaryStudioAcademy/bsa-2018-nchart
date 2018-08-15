const Repository = require('../../common/repository/repository');
const chartTypeModel = require('./chart_type.model');

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
				'name',
				'description',
				'dimension_settings',
				'customize_settings'
			]
		});
	}
}

module.exports = new ChartTypeRepository();
