const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.route");
const { noteRouter } = require("./routes/Note.router");
const { authenticate } = require("./middlewares/authentication");
require('dotenv').config()

const cors=require("cors")

const app = express();
app.use(cors({
  origin:"*"
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/users", userRouter);

app.use(authenticate);
app.use("/notes", noteRouter);

let port=process.env.port
app.listen(port, async () => {
  try {
    await connection;
    console.log("Db conneted");
  } catch (error) {
    console.log("Db not conneted");
  }
  console.log(`port will run ${port}`);
});
