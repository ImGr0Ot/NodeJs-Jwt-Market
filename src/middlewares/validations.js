import { body, validationResult } from "express-validator";

export const userRegistrer = (req, res, next) => {
  body("name", "Not a valid name")
    .notEmpty()
    .exists()
    .withMessage("The name already exists")
    .isLength({ min: 4 })
    .withMessage("Min lenght is 4 letters"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Min 6 characteres")
      .isStrongPassword();

  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const productRegistrer = (req, res) => {
  console.log('hola')
  body("name", "Not a valid name")
    .notEmpty()
    .exists()
    .withMessage("The name already exists")
    .isLength({ min: 4 })
    .withMessage("Min lenght is 4 letters"),
    body("price", "Invalid price").notEmpty().isNumeric().withMessage("no es un #"),
    body("category","Invalid category").notEmpty(),
    body("imgURL", "Invalid image").isURL().notEmpty();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
}

export const validatorBody = (res, req, next)=> {
  console.log("hola, estoy en el body")
  body("name", "Not a valid name")
  .notEmpty()
  .exists()
  .withMessage("The name already exists")
  .isLength({ min: 4 })
  .withMessage("Min lenght is 4 letters"),
  body("price", "Invalid price").notEmpty().isNumeric().withMessage("no es un #"),
  body("category","Invalid category").notEmpty(),
  body("imgURL", "Invalid image").isURL().notEmpty();
  next();
  }

export const validatorResult = () =>{
  console.log('hola')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.json({ errors: errors.array() });
    
  }
}
