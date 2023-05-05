import PostModel from '../models/post.js';

export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy, sortOrder } = req.query;
    const posts = await PostModel.find()
      .limit(limit)
      .skip(page * limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const count = await PostModel.countDocuments();
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', count);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get posts'
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get post'
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndRemove(postId);
    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to delete posts'
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      creator: req.body.creator,
      title: req.body.title,
      link: req.body.link,
      pubDate: req.body.pubDate,
      content: req.body.content,
      contentSnippet: req.body.contentSnippet,
      guid: req.body.guid,
      categories: req.body.categories,
      isoDate: req.body.isoDate
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to create a post'
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId
      },
      {
        creator: req.body.creator,
        title: req.body.title,
        link: req.body.link,
        pubDate: req.body.pubDate,
        content: req.body.content,
        contentSnippet: req.body.contentSnippet,
        guid: req.body.guid,
        categories: req.body.categories,
        isoDate: req.body.isoDate
      }
    );

    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update a post'
    });
  }
};

