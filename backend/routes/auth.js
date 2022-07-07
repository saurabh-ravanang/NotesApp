const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const jwtSecret = "saurabh$boy";

//  1.create user  no login required
Router.post("/createuser", [
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "password is short").isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    // if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // check email exists or not
    try {
        let user = await User.findOne({success, email: req.body.email });
        // console.log(user);
        if (user) {
            return res.status(400).json({success, error: "sorry email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        //   .then(user => res.json(user))
        //   .catch(err=> {console.log(err)
        // res.json({error: "please enter unique email", message: err.message})})
        // res.send(req.body);
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        // console.log(jwtData);
        // res.json(user);
        success = true;
        res.json({success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

// 2.authenticate user  no login required
Router.post("/login", [
    body('email', "Enter valid email").isEmail(),
    body('password', "Password cant blank").exists()
], async (req, res) => {
    let success = false;
    // if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "try to login with coreect cretential" });
        }
        const passCompared = await bcrypt.compare(password, user.password);
        if (!passCompared) {
            success = false;
            return res.status(400).json({success, error: "try to login with coreect cretential" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

// 3. get login user detail /getuser -- login required
Router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
module.exports = Router