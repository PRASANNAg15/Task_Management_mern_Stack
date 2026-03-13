import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
    try {
        const { name, password, role, email } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);
        const saveUser = new User({
            name,
            email,
            password: hashedpassword,
            role: role
        });
        await saveUser.save();
        const { password: pwd, ...userData } = saveUser._doc;
        res.status(201).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            res.status(400).json({ message: "User Not found" });
        }
        res.status(200).json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(400).json({ message: "User Not found" });
        }
        res.status(200).json({ message: "Successfull" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
         if (!user) {
            res.status(400).json({ message: "User Not found" });
        }
        res.status(200).json(user);
       
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}
export const logInUser = async (req, res) => {
    const { email, password } = req.body;
    const JWT_SECRET = "your_jwt_secret_here";
    try {
        const user =await  User.findOne({email:email});
        if (!user) {
            res.status(400).json({ message: "Invalid Email or Password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid Email or password" });
        }
        const payload = {
            id: user._id,
            role: user.role
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        const { password: pwd, ...userData } = user._doc;
        res.status(200).json({
            token,
            user: userData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};