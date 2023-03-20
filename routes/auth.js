const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email address");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("User with this email address already exists");
    }

    if (username.length > 200 || password.length > 200) {
      return res
        .status(400)
        .send("Username and password must be less than 50 characters");
    }

    if (!username.length || !password.length) {
      return res.status(400).send("Username and password cannot be blank");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;





