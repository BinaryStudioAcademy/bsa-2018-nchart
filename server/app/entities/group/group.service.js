const GroupRepository = require("./group.repository");

module.exports = {
  findAll: callback => {
    new GroupRepository().getAll((err, data) => {
      callback(null, data);
    });
  },
  findById: (id, callback) => {
    new GroupRepository().getById(id, (err, data) => {
      callback(err, data);
    });
  },
  save: (obj, callback) => {
    new GroupRepository().save(obj, (err, data) => {
      callback(err, data);
    });
  },

  removeById: (id, callback) => {
    new GroupRepository().removeById(id, (err, data) => {
      callback(err, data);
    });
  },

  update: (id, obj, callback) => {
    new GroupRepository().update(id, obj, (err, data) => {
      callback(err, data);
    });
  }
};