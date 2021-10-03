const express = require("express");
const auth = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    console.log("server error");
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
