const user = require("express").Router();
const userService = require("../../entities/user/user.service");

user.get("/", (req, res, next) => {
  userService.findAll((err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

user.get("/:id", (req, res, next) => {
  userService.findById(Number(req.params.id), (err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

/**
 * Register user
 *
 * @param {req} req.body - expected array:
 *
 * {
   "user":{
      "first_name":"test_name",
      "last_name":"test_surname",
      "email":"user@gmail.com",
      "password":"password"
   },
   "company": "BSA" || false
   }
 *
 * @returns array of created entities, status 400 if it's not
 */
user.post("/registration", (req, res, next) => {
  userService.save(req.body, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

/**
 * Login user
 *
 * @param {req} req.body - expected array:
 *
 * {
      "email":"user@gmail.com",
      "password":"password"
   }
 *
 * @returns "success" if login successful, status 400 if it's not.
 */
user.post("/login", (req, res, next) => {
  userService.login(req.body, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.status(400);
      res.end();
      throw err;
    }
  });
});

user.put("/:id", (req, res, next) => {
  userService.update(Number(req.params.id), req.body, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

user.delete("/:id", (req, res, next) => {
  userService.removeById(Number(req.params.id), (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

module.exports = user;
