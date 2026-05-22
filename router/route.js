const { Router } = require("express");
const User = require("../database/data"); // your model

const router = Router();

// TEST ROUTE
router.get("/", (req, res) => {
  res.json({ message: "API is working " });
});

//  LOGIN 

// 
// but keeping for testing
router.get("/login", (req, res) => {
  res.json({ message: "Login route working " });
});

router.post("/login", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    if (!req.body) {
      return res.status(400).json({ message: "No data received" });
    }

    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found " });
    }

    //  Check password (plain for now)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password " });
    }

    //  Success
    return res.status(200).json({
      message: "Login successful ",
      user,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;