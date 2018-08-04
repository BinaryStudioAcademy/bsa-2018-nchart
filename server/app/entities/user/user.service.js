const UserRepository = require("./user.repository");

module.exports = {
  findAll: callback => {
    new UserRepository().getAll((err, data) => {
      callback(null, data);
    });
  },
  findById: (id, callback) => {
    new UserRepository().getById(id, (err, data) => {
      callback(err, data);
    });
  },
  save: (obj, callback) => {
    new UserRepository().save(obj, (err, data) => {
      callback(err, data);
    });
  },

  removeById: (id, callback) => {
    new UserRepository().removeById(id, (err, data) => {
      callback(err, data);
    });
  },

  update: (id, obj, callback) => {
    new UserRepository().update(id, obj, (err, data) => {
      callback(err, data);
    });
  }
};
