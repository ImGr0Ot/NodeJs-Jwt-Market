import { Router } from "express";
import * as productsCtrl from "../controllers/products.controller.js";
import { authJwt } from "../middlewares/index.js";
import { body, validationResult } from "express-validator";

const router = Router();

router.get("/", productsCtrl.getProducts);

router.post(
  "/",
  [
    //validacion-body
    body("name", "Not a valid name")
      .notEmpty()
      .exists()
      .withMessage("The name already exists")
      .isLength({ min: 4 })
      .withMessage("Min lenght is 4 letters"),
    body("price", "Invalid price")
      .notEmpty()
      .isNumeric()
      .withMessage("no es un #"),
    body("category", "Invalid category").notEmpty(),
    body("imgURL", "Invalid image").isURL().notEmpty(),

    authJwt.verifyToken,
    authJwt.isAdmin,
  ], (req, res) => {
    
    //validation-validation result
    console.log('en el validation result');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).send({ errors: errors.array() });
    }
    productsCtrl.createProduct
  }
);

router.get("/:productId", productsCtrl.getProductById);

router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.updateProductById
);

router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProductById
);

export default router;
