const ProjectRepository = require("./project.repository");

module.exports = {
  findById: (id, callback) => {
    new ProjectRepository().getById(id, (err, data) => {
      callback(err, data);
    });
  },
  save: (obj, callback) => {
    new ProjectRepository().save(obj, (err, data) => {
      callback(err, data);
    });
  },

  removeById: (id, callback) => {
    new ProjectRepository().removeById(id, (err, data) => {
      callback(err, data);
    });
  },

  update: (id, obj, callback) => {
    new ProjectRepository().update(id, obj, (err, data) => {
      callback(err, data);
    });
  }
};
