const { login, logout, register, updateProfile, forgetPassword, resetPassword } = require("../controllers/user.controller");
const express = require("express");
const { singleUpload } = require("../middlewares/mutler");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword);

module.exports =  router;