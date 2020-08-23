const specs = require("../controllers/spec.controller.js");

const router = require("express").Router();

router.get("/", specs.findAll);
router.get("/started", specs.findAllStarted);
router.get("/:id", specs.findOne);

router.post("/", specs.create);

router.put("/:id", specs.update);

router.delete("/:id", specs.delete);
router.delete("/delall", specs.deleteAll);

module.exports = router;