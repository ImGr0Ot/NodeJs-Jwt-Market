import { Router } from "express";
import * as userCtrl from "../controllers/user.controller.js";
import * as authJwt from "../middlewares/auth.jwt.js";
import { body, validationResult } from "express-validator";
const router = Router();

router.post(
  "/",[
  //validation - body
  body("username", "Not a valid name")
    .notEmpty()
    .exists()
    .withMessage("The name already exists")
    .isLength({ min: 4 })
    .withMessage("Min lenght is 4 letters"),
  body("email", "Invalid email").isEmail(),
  body("password", "invalid password")
    .isStrongPassword()
    .withMessage("is not a strong password"),

  authJwt.verifyToken, authJwt.isAdmin,],
  (req, res) => {
    //validation-validation result
    console.log("en el validation result");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).send({ errors: errors.array() });
    }
    console.log("Entrando al create")
    userCtrl.createUser;
  }
);

router.get("/", [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getUsers);
router.get(
  "/:userId",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.getUserById
);

router.delete(
  "/:userId",
  [authJwt.verifyToken, authJwt.isAdmin],
  userCtrl.deleteUserById
);

export default router;
