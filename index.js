const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to mongoDB Successfully");
  })
  .catch((err) =>
    console.log(err, "Database connection terminated try again!")
  );

const authRoute = require("./routes/auth");
const productsRoute = require("./routes/productRoutes");

app.use("/api", authRoute);
app.use("/api", productsRoute);

app.listen(4000, () => console.log("Server is running on port 4000"));
