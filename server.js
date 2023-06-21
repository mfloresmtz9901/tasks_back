require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Node API app is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
