const postCtrl = {};

const Post = require("../models/Post");

postCtrl.getPosts = async (req, res) => {
  try {
    console.log(Post);
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

postCtrl.createPost = async (req, res) => {
  const { name, userName, verified, text, avatar, imagePost } = req.body;
  try {
    const newPost = new Post({
      name,
      userName,
      verified,
      text,
      avatar,
      imagePost,
    });
    await newPost.save();
    res.json("New Post added");
  } catch (e) {
    console.log(e);
    res.json(e.errmsg);
  }
};

postCtrl.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.json("Post deleted");
  } catch (e) {
    res.json(e.errmsg);
  }
};

postCtrl.updatePost = async (req, res) => {
  const { id, text } = req.body;
  try {
    await Post.updateOne(
      { _id: id },
      {
        $set: {
          text: text,
        },
      }
    );
    res.json("Post update");
  } catch (e) {
    res.json(e.errmsg);
  }
};

module.exports = postCtrl;
