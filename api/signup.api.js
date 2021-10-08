const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = express.Router();
const sendEmail = require("../server-utils/sendEmail");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");
const upload = require("../middleware/upload.middleware");

router.post("/", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  try {
    if (password.length < 6) {
      return res.status(401).json({ msg: "Password should be greater than 6" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(401).json({ msg: "Email exists" });
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      password,
      profilePicUrl: req.file && req.file.path,
    });

    user.password = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/onboarding/${verificationToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Chit chat - Account Verification",
        html: `<p>Please confirm your Chit chat account registration by visiting this URL and completing the onboarding process: ${verificationUrl}</p>`,
      });
      await user.save();
      await new Chat({ user: user._id, chats: [] }).save();
    } catch (err) {
      console.log(err);
      user.verificationToken = undefined;
      await user.save();
      return res.status(500).json({ msg: "Error sending verification email" });
    }

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          msg: "Please verify your email to verify your registration",
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    console.log("server error");
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
