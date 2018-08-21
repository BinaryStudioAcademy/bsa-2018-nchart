const sequelize = require('../../config/index');

function TransactionService(objs, model, method) {
	if (objs && model && method) {
		if (method === 'save') {
			return sequelize.transaction(t => {
				const promises = [];
				for (let i = 0; i < objs.length; i += 1) {
					const newPromise = model.create(objs[i], {
						transaction: t
					});
					promises.push(newPromise);
				}
				return Promise.all(promises);
			});
		}
		if (method === 'update') {
			return sequelize.transaction(t => {
				const promises = [];
				for (let i = 0; i < objs.length; i += 1) {
					const newPromise = model.update(
						objs[i],
						{ where: { id: objs[i].id } },
						{ transaction: t }
					);
					promises.push(newPromise);
				}
				return Promise.all(promises);
			});
		}
		if (method === 'upsert') {
			return sequelize.transaction(t => {
				const promises = [];
				for (let i = 0; i < objs.length; i += 1) {
					const newPromise = model.upsert(
						objs[i],
						{ transaction: t }
					);
					promises.push(newPromise);
				}
				return Promise.all(promises);
			});
		}
	} else {
		throw new Error('Incorrect usage of method');
	}
}

module.exports = TransactionService;
