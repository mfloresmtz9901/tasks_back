const Tasks = require("../models/userModel");

var express = require("express");
var router = express.Router();

//routes
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findByIdAndUpdate(id, req.body);
    // we cannot find any task in database
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

router.delete("/tasks/:id", async (req, res) => {
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
