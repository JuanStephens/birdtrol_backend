const postCtrl = {};

const Post = require("../models/Post");

postCtrl.getPosts = async (req, res) => {
  try {
    console.log(Post);
    const posts = await Post.find();
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
  console.log(id);
  await Post.findByIdAndDelete(id);
  res.json("Post deleted");
};

postCtrl.updatePost = async (req, res) => {
  const { id, text } = req.body;
  console.log(id + " " + text);
  await Post.updateOne(
    { _id: id },
    {
      $set: {
        text: text,
      },
    }
  );
  res.json("Post update");
};

module.exports = postCtrl;
