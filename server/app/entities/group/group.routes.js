const group = require("express").Router();
const groupService = require("../../entities/group/group.service");

group.get("/", (req, res, next) => {
  groupService.findAll((err, data) => {
    if (!err) {
      console.log(data);
      res.json(data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

group.get("/:id", (req, res, next) => {
  groupService.findById(Number(req.params.id), (err, data) => {
    if (!err) {
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

group.post("/", (req, res, next) => {
  groupService.save(req.body, (err, data) => {
    if (!err) {
      res.json(req.body);
    } else {
      res.status(400);
      res.end();
    }
  });
});

group.put("/:id", (req, res, next) => {
  groupService.update(Number(req.params.id), req.body, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

group.delete("/:id", (req, res, next) => {
  groupService.removeById(Number(req.params.id), (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

module.exports = group;
