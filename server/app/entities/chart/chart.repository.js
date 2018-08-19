const Repository = require('../../common/repository/repository');
const chartModel = require('./chart.model');
const sequelize = require('../../config/index');

class ChartRepository extends Repository {
	constructor() {
		super();
		this.model = chartModel;
	}

	getAll() {
		return this.model.findAll({
			attributes: ['id', 'chartTypeId', 'dimensionSettings', 'customizeSettings', 'datasetId', 'createdAt']
		});
	}

	update(obj) {
		// todo: "Cannot read property 'model' of undefined"
		this.model = chartModel;
		return sequelize.transaction(t => {
			const promises = [];
			for (let i = 0; i < obj.length; i += 1) {
				const newPromise = chartModel.update(
					{
						id: obj[i].id,
						chartTypeId: obj[i].chartTypeId,
						datasetId: obj[i].datasetId,
						dimensionSettings: obj[i].dimensionSettings,
						customizeSettings: obj[i].customizeSettings
					},
					{ where: { id: obj[i].id } },
					{ transaction: t }
				);
				promises.push(newPromise);
			}
			return Promise.all(promises);
		});
	}

	save(obj) {
		// todo: "Cannot read property 'model' of undefined"
		this.model = chartModel;
		return sequelize.transaction(t => {
			const promises = [];
			for (let i = 0; i < obj.length; i += 1) {
				const newPromise = chartModel.create(
					{
						chartTypeId: obj[i].chartTypeId,
						datasetId: obj[i].datasetId,
						dimensionSettings: obj[i].dimensionSettings,
						customizeSettings: obj[i].customizeSettings
					},
					{ transaction: t }
				);
				promises.push(newPromise);
			}
			return Promise.all(promises);
		});
	}
}

module.exports = new ChartRepository();
