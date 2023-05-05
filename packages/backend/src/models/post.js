import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    creator: String,
    title: String,
    link: String,
    pubDate: String,
    content: String,
    contentSnippet: String,
    guid: String,
    categories: [String],
    isoDate: String
  },
  {
    timestamps: true
  }
);
export default mongoose.model('Post', PostSchema);
