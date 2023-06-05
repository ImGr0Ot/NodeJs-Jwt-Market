import Role from "../models/Role";
import User from "../models/User";

export const createRoles = async () => {
  try {
    if ((await Role.estimatedDocumentCount()) > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
//para el rol


export const createAdmin = async () => {
  try {
    if ((await User.estimatedDocumentCount()) > 0) return;

    const newUser = new User({
      username: "admin",
      email: "admin@gmail.com",
      password: User.encryptPassword("password"),
      roles: [await Role.findOne({ name: "admin" })._id]
    });

    await newUser.save();
    console.log("admin create");
  } catch (error) {
    console.error(error);
  }
};
