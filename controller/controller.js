const User = require("../model/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, password, email } = req.body;
  const getuser = await User.findOne({ email });
  if (getuser) return res.send("Already User Exist");
  const user = new User({
    name: name,
    password: password,
    email: email,
  });
  const userdata = await user.save();
  res.send(userdata);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  //   Check a email is there Or Not
  const user = await User.findOne({ email });
  if (!user) res.status(400).send("Sorry User Not Found");

  //   Check email and Password
  let isuserdetailsCorrect = user.email == email && user.password == password;

  if (isuserdetailsCorrect) {
    const token = jwt.sign({ _id: user._id }, "MYSECRETDEMO");
    res.cookie("token", token, { expiresIn: "1d" });
    res.send(`user Signed Succussfully , ${user.name}`);
  } else {
    res.status(400).send("Sorry A username and email is not correct");
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout Success" });
};

const requireSignIn = (req, res, next) => {
  let token = req.header("x-access-token") || req.cookies.token;

  jwt.verify(token, "MYSECRETDEMO", (err, decoded) => {
    if (err) {
      res.status(401).send(err);
    } else {
      console.log(decoded);
      req.user = decoded;
    }
    next();
  });
};
const hello = (req, res) => {
  let WithAdmin = {
    name: "Rakesh laishetty",
    email: "Ra@gmail.com",
    password: 12345678,
  };

  let WithOutAdmin = {
    name: "Rakesh laishetty",
    email: "Rakeshlaishetty123@gmail.com",
    password: 12345678,
  };

  res.send({ WithAdmin: WithAdmin, WithOutAdmin: WithOutAdmin });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  let isadmin = user.isAdmin === true || user.isAdmin == 1;

  if (isadmin) {
    next();
  } else {
    res.send("UnAuthorized Access");
  }
};
const getAllUsers = async (req, res) => {
  const users = await User.find().select(["-password"]);
  res.send(users);
};
module.exports = {
  signup,
  login,
  getAllUsers,
  logout,
  hello,
  requireSignIn,
  isAdmin,
};
