import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/Role.js";

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  // creamos el usuario
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });
  if (roles) {
    const foundRoles = await Role.find({
      name: {
        $in: roles,
      },
    });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save(); // se guarda en bd
  console.log(savedUser);
  // generamos el token
  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  const userFound = await User.findOne({
    email: req.body.email
  }).populate("roles")
  if (!userFound) return res.status(400).json({message: "User Not Found"})

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)
  
  if (!matchPassword) return res.status(401).json({message: "Invalid Password"})
 
  const token = jwt.sign({
    id: userFound._id }, config.SECRET,{
      expiresIn: 86400
    })
  res.json({token})
};
