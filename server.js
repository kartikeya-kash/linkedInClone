import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './User.js';
import Post from './Post.js';

const app = express();
app.use(express.json());
app.use(cors());

    mongoose
    .connect("mongodb+srv://lncloneuser:yQT6VdGGP5dtL2Kc@cluster0.dyayugv.mongodb.net/")
    .then(() => console.log("Connected to MongoDB: lnclonedb"))
    .catch((err) => console.error("MongoDB connection error:", err));

    app.get('/test', (req, res) => {
        res.send('server is running');
    });


app.get('/test', (req, res) => {
  res.send('server is running');
});

    app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ fullName, email, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
});


// ✅ Create a new post
app.post("/posts", async (req, res) => {
  try {
    const { authorEmail, content } = req.body;

    if (!authorEmail || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = new Post({ authorEmail, content });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// ✅ Get all posts (sorted by newest first)
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// ✅ Like a post
app.put("/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes += 1;
    await post.save();

    res.status(200).json({ message: "Post liked", likes: post.likes });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Error liking post" });
  }
});

// ✅ Add a comment to a post
app.post("/posts/:id/comment", async (req, res) => {
  try {
    const { userEmail, text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ userEmail, text });
    await post.save();

    res.status(201).json({ message: "Comment added", post });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment" });
  }
});


// ✅ Get all posts for a specific user
app.get("/posts/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const posts = await Post.find({ authorEmail: email }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ message: "Error fetching user posts" });
  }
});

// ✅ Edit (update) a post
app.put("/posts/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Error updating post" });
  }
});

// ✅ Delete a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
});

const PORT = 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));