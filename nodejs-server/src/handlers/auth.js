const db = module.require("../models");
const jwt = module.require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    console.log(req.body);
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

const signin = async (req, res, next) => {};

module.exports = { signup, signin };
