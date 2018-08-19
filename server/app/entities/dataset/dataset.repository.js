const Repository = require('../../common/repository/repository');
const datasetModel = require('./dataset.model');
const sequelize = require('../../config/index');

class DatasetRepository extends Repository {
	constructor() {
		super();
		this.model = datasetModel;
	}

	update(obj) {
		// todo: "Cannot read property 'model' of undefined"
		this.model = datasetModel;
		return sequelize.transaction((t) => {
			const promises = [];
			for (let i = 0; i < obj.length; i += 1) {
				const newPromise = datasetModel.update({
					id: obj[i].id,
					data: { columns: obj[i].columns, data: obj[i].data }
				},
				{ where: { id: obj[i].id } }, { transaction: t });
				promises.push(newPromise);
			}
			return Promise.all(promises);
		});
	}

	save(obj) {
		// todo: "Cannot read property 'model' of undefined"
		this.model = datasetModel;
		return sequelize.transaction((t) => {
			const promises = [];
			for (let i = 0; i < obj.length; i += 1) {
				const newPromise = datasetModel.create(
					{ data: { columns: obj[i].columns, data: obj[i].data } },
					{ transaction: t }
				);
				promises.push(newPromise);
			}
			return Promise.all(promises);
		});
	}
}

module.exports = new DatasetRepository();
