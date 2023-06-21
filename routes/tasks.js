const Tasks = require("../models/tasksModel");

var express = require("express");
var router = express.Router();

//routes
router.get("/get-all", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-all/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Tasks.find({ user_id: id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-all/:id/:order/:status", async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Tasks.find({ user_id: id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a task
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res
        .status(404)
        .json({ message: `cannot find any task with ID ${id}` });
    }
    const updatedTasks = await Tasks.findById(id);
    res.status(200).json(updatedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a task

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: `cannot find any task with ID ${id}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
