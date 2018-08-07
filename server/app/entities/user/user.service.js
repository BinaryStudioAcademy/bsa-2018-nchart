const UserRepository = require("./user.repository");
const CompanyService = require("../company/company.service");
const CompanyUserService = require("../company_user/company_user.service");
const GroupService = require("../group/group.service");
const GroupUserService = require("../group_user/group_user.service");

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
    let payload = {
      user: null,
      company: null,
      company_user: null,
      group: null,
      group_user: null
    };
    UserRepository.save(obj, (err, data) => {
      if (err) {
        callback(err, data);
        throw err;
      }
      payload.user = Object.assign({}, data);
      GroupService.save("General", (err, data) => {
        if (err) {
          callback(err, data);
          throw err;
        }
        payload.group = Object.assign({}, data);
        GroupUserService.save(
          payload.user.id,
          payload.group.id,
          (err, data) => {
            if (err) {
              callback(err, data);
              throw err;
            }
            payload.group_user = Object.assign({}, data);
            CompanyService.save(obj, (err, data) => {
              if (err) {
                callback(err, data);
                throw err;
              }
              payload.company = Object.assign({}, data);
              CompanyUserService.save(
                payload.user.id,
                payload.company.id,
                (err, data) => {
                  if (err) {
                    callback(err, data);
                    throw err;
                  }
                  payload.company_user = Object.assign({}, data);
                  console.log(payload);
                  callback(null, payload);
                }
              );
            });
          }
        );
      });
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
