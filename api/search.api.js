const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const auth = require("../middleware/auth.middleware");

router.get("/users/:searchText", auth, async (req, res) => {
  const { searchText } = req.params;
  if (searchText.trim().length === 0) {
    return res.status(400).json({ msg: "Search text too short" });
  }

  try {
    let users = await User.find({
      name: { $regex: searchText, $options: "i" },
    });

    users = users.filter((user) => user._id.toString() !== req.userId);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
