const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');

class ProjectRepository extends Repository {
	constructor() {
		super();
		this.model = projectModel;
	}

	update(obj) {
		return this.model.update(obj, {
			where: {
				id: obj.id
			}
		});
	}

	handleProjectReq(obj) {
		if (obj.id) {
			return this.model.update({ name: obj.name }, {
				where: {
					id: obj.id
				}
			});
		}
		return this.model.create({ name: obj.name });
	}
}

module.exports = new ProjectRepository();
