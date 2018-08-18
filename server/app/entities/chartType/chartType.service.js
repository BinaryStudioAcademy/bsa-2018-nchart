const ChartTypeRepository = require('./chartType.repository');
const ErrorService = require('../../common/services/error.service');

class ChartTypeService {
	constructor() {
		this.ChartTypeRepository = ChartTypeRepository;
	}

	getAll() {
		return this.ChartTypeRepository.getAll();
	}

	getById(id) {
		return this.ChartTypeRepository.getById(id)
			.then(data => {
				if (data === null) {
					throw new Error('Object did not exist');
				} else {
					return data;
				}
			})
			.catch(err => {
				throw ErrorService.createCustomDBError(err);
			});
	}

	save() {
		return this.ChartTypeRepository.save();
	}
}

module.exports = new ChartTypeService();
