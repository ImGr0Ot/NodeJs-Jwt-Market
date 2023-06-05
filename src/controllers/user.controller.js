import User from "../models/User.js";


export const getUsers = async (req, res) => {
    const user = await User.find();

    res.json(user)
}

export const  getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user)
    
}

export const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body,{
        new: true
    })
    res.status(200).json(updatedUser)
}

export const deleteUserById = async(req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).json("user deleted")
}
