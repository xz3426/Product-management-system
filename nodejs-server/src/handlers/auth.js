const db = module.require("../models");
const jwt = module.require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    let { id, username, authorization, profileImageUrl } = user;
    let token = await jwt.sign(
      { id, username, authorization, profileImageUrl },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email/password" });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      let { id, username, authorization, profileImageUrl } = user;
      let token = await jwt.sign(
        { id, username, authorization, profileImageUrl },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token,
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = { signup, signin };
