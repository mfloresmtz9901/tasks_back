const User = require("../models/userModel");

var express = require("express");
const bcrypt = require("bcrypt");
var router = express.Router();

//routes

// Get Users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User
router.post("/get-user", async (req, res) => {
  try {
    const userInstance = req.body;
    const user = await User.findOne({ email: userInstance.email });
    bcrypt.compare(userInstance.password, user.password, (err, result) => {
      if (result) {
        return res.status(200).json(user);
      }
      return res.status(401).json({ message: "Invalid credentials" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create User
router.post("/add", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a user
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any user with ID ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a user

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any user with ID ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
