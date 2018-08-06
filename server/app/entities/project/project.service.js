const ProjectRepository = require("./project.repository");

module.exports = {
  findById: (id, callback) => {
    ProjectRepository.getById(id, (err, data) => {
      callback(err, data);
    });
  },
  save: (obj, callback) => {
    ProjectRepository.save(obj, (err, data) => {
      callback(err, data);
    });
  },

  removeById: (id, callback) => {
    ProjectRepository.removeById(id, (err, data) => {
      callback(err, data);
    });
  },

  update: (id, obj, callback) => {
    ProjectRepository.update(id, obj, (err, data) => {
      callback(err, data);
    });
  }
};
