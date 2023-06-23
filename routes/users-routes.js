const express = require("express");
const { check } = require('express-validator')
const router = express.Router();

const usersControllers = require("../controllers/users-controllers");

router.post("/signup", [
    check("email").normalizeEmail().isEmail().withMessage("Please enter a valid email"),
    check("password")
        .trim()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password required")

], usersControllers.signup);
router.post("/login", usersControllers.login);


module.exports = router;
