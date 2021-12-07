import User from '../models/User';
import jwt from 'jwt-simple';
import dotEnv from 'dotenv';
// import { use } from 'passport';
dotEnv.config();

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.find({email: {$in: [email]}});
        console.log(user);
        var decode = jwt.decode(user[0].password, process.env.SECRET_KEY);
        if (password === decode.password)
        {
            var payload = {userId: user[0]._id, role: user[0].role};
            var secret = process.env.SECRET_KEY;
            var token = jwt.encode(payload, secret);
                    }
        return res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: `Error Logged in failed: ${error.message}`

        })
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find();

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting all users: ${error.message}`
        })
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params._id);
        if (!user) {
            return res.status(404).json( {
                success: false,
                error: 'user Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting user ${req.params.id}: ${error.message}`
        })
    }
}
const updateUser = async (req, res, next) => {
    try {
        const User = await user.findById(req.params.id).exec();
        if (!user) {
            return res.status(404).json( {
                success: false,
                error: 'user Not updated'
            })
        }
        console.log(req.body)
        user.set(req.body);
        var update = await user.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting user ${req.params.id}: ${error.message}`
        })
    }
}

const addAdmin= async (req, res, next) => {
    try {
        const { email, username, password} = req.body;
        var payload = { password }
        var secret = process.env.SECRET_KEY
        var token = jwt.encode(payload, secret);
        var role = "admin";
    
        const admin = await User.create({ email,username,password:token, role});
        return res.status(201).json({
            success: true,
            data: admin
        })
    } catch (error) {
        console.log(req);

        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: `Error Adding Toy Car: ${error.message}`
            })
        }
    }

}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json( {
                success: false,
                error: 'User Not Deleted'
            })
        }

        await user.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Deleting user : ${error.message}`
        })
    }
}
export {addAdmin, login, getAllUsers, getUserById, updateUser,deleteUser}
