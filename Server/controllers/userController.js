import Users from "../models/UserSchema.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const {name, username, email, phone} = req.body;
    try {
        const existingUsername = await Users.findOne({username});
        if(existingUsername){
            return res.status(400).send({message: `Username ${username} exists`});
        }

        const existingEmail = await Users.findOne({email});
        if(existingEmail){
            return res.status(400).send({message: `Email ${email} exists`});
        }

        const password = await bcrypt.hash(req.body.password, 10);

        const newUser = new Users({
            name,
            username,
            email,
            phone,
            password
        });

        await newUser.save();

        return res.status(201).send({message: "User registered successfully"});
    } catch (error) {
        res.status(500).send({message: "Error registering user", error: error.message});
    }
}

// sendgrid

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await Users.findOne({username});

        if(!user){
            return res.status(401).send({message: "Incorrect credentials"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).send({message: "Incorrect credentials"});
        }

        const token = jwt.sign(
        {
           userId: user._id,
           username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
     );

       res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
       });

       const loggedInUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
      };

    return res.status(200).send({message: "User has logged in successfully", loggedInUser});


    } catch (error) {
        res.status(500).send({message: "Error logging in user", error: error.message});
    }
}

export function logout(req, res) {
    res.clearCookie("token");
    res.status(200).send({ message: "Logged out successfully" });
  }