const router = require("express").Router();
// const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const verify = require("../routes/verifyToken");

router.get("/", verify, async (req, res) => {
  try {
    const posts = await postModel.find({ author: req.user._id });
    res.json({ posts });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

router.post("/", verify, async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new postModel({
      title,
      description,
      author: req.user._id,
    });
    await post.save();
    res.json({ post });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

router.put("/:postId", verify, async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await postModel.findOneAndUpdate(
      { _id: req.params.postId, author: req.user._id },
      { title, description },
      { new: true }
    );
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json({ post });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

router.patch("/:postId", verify, async (req, res) => {
  try {
    const post = await postModel.findOneAndUpdate(
      { _id: req.params.postId, author: req.user._id },
      req.body,
      { new: true }
    );
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json({ post });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

router.delete("/:postId", verify, async (req, res) => {
  try {
    const post = await postModel.findOneAndDelete({
      _id: req.params.postId,
      author: req.user._id,
    });
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
