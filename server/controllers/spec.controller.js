const db = require("../models");
const Spec = db.specs;

const specActions = {
  create(req, res) {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const spec = new Spec({
      title: req.body.title,
      description: req.body.description,
      started: req.body.started ? req.body.started : false
    });

    spec
      .save(spec)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Spec."
        });
      });
  },

  findAll(req, res) {
    const title = req.query.title;
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Spec.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving spec."
        });
      });
  },

  findOne(req, res) {
    const id = req.params.id;

    Spec.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: "Not found Spec with id " + id });
        }
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Spec with id " + id });
      });
  },

  update(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    Spec.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Spec with id=${id}. Spec was not found!`
          });
        } else res.send({ message: "Spec was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Spec with id=" + id
        });
      });
  },

  delete(req, res) {
    const id = req.params.id;

    Spec.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Spec with id=${id}. Spec was not found!`
          });
        } else {
          res.send({
            message: "Spec was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Spec with id=" + id
        });
      });
  },

  deleteAll(req, res) {
    Spec.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Specs were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Specs."
        });
      });
  },

  findAllStarted(req, res) {
    Spec.find({ started: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Specs."
        });
      });
  }
}

module.exports = specActions;