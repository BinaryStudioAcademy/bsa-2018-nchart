const user = require("express").Router();
const userService = require("../../entities/user/user.service");

user.get("/", (req, res, next) => {
  userService.findAll((err, data) => {
    if (!err) {
      console.log(data);
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

user.post("/", (req, res, next) => {
  userService.save(req.body, (err, data) => {
    if (!err) {
      res.json(req.body);
    } else {
      res.status(400);
      res.end();
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
