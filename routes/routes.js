const express = require("express");
const {
  signup,
  login,
  logout,
  getAllUsers,
  hello,
  requireSignIn,
  isAdmin,
} = require("../controller/controller");

const router = express.Router();
// Simple Route With Hello Message
router.get("/", hello);
// get All user
router.get("/getAllusers", requireSignIn, isAdmin, getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
