const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.route");
const { noteRouter } = require("./routes/Note.router");
const { authenticate } = require("./middlewares/authentication");
var cors = require('cors')
const app = express();
// const cors=require("cors")
require('dotenv').config()


// app.use(cors({
//   origin:"*"
// }))
app.use(express.json());
app.use(cors())


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
