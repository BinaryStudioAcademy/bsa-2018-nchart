const UserRepository = require("./user.repository");

module.exports = {
  findAll: callback => {
    UserRepository.getAll((err, data) => {
      callback(null, data);
    });
  },
  findById: (id, callback) => {
    UserRepository.getById(id, (err, data) => {
      callback(err, data);
    });
  },
  save: (obj, callback) => {
    UserRepository.save(obj, (err, data) => {
      callback(err, data);
    });
  },

  removeById: (id, callback) => {
    UserRepository.removeById(id, (err, data) => {
      callback(err, data);
    });
  },

  update: (id, obj, callback) => {
    UserRepository.update(id, obj, (err, data) => {
      callback(err, data);
    });
  }
};
