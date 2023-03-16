const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to mongoDB Successfully");
  })
  .catch(() => console.log("Database connection terminated try again!"));




const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

app.use("/api/user", authRoute);
app.use("/api/posts", postsRoute);





app.listen(4000, () => console.log("Server is running on port 4000"));
