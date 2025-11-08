import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    authorEmail: { type: String, required: true }, // user who posted
    content: { type: String, required: true },     // post content
    likes: { type: Number, default: 0 },           // like count
    comments: [
      {
        userEmail: { type: String },               // who commented
        text: { type: String },                    // comment text
        createdAt: { type: Date, default: Date.now }
      }
    ],                                             // array of comments
    createdAt: { type: Date, default: Date.now },  // post timestamp
  },
  { collection: "posts" } // optional but consistent
);

const Post = mongoose.model("Post", postSchema);
export default Post;