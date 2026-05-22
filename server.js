const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//B CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => console.log(err));

// 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneNo: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

//  AUTH MIDDLEWARE 
const checkAuthentication = (req, res, next) => {
  // TEMP: allow all requests
  console.log("Auth Middleware Passed ");
  next();
};

const jwt = require("jsonwebtoken");
app.post("/login", async (req, res) => {
  try {
    console.log("LOGIN API HIT ", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
 const token = jwt.sign(
      { id: user._id },
      "secretkey123",
      { expiresIn: "1h" }
    );
console.log("TOKEN GENERATED:", token);
    res.status(200).json({
      message: "Login successful ",
      token,
      user
    });
console.log("USER FOUND:", user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  PROTECTED ROUTES 
app.use(checkAuthentication);

//CRUD

// CREATE
app.post("/users", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//port
app.listen(5000, () => {
  console.log("Server running on http://127.0.0.1:5000 ");
});