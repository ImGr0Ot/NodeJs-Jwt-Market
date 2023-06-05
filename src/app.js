import express from "express"
import morgan from "morgan"
import pkg from "../package.json"
import productsRoutes from "./routes/products.routes.js"
import authRoutes from "./routes/auth.routes.js";
import {createRoles,createAdmin} from "./libs/initialSetup.js";
import userRoutes from "./routes/users.routes.js";

const app  = express()
createRoles()
//createAdmin()
app.set('pkg', pkg)
app.use(express.json())
app.use(morgan("dev"))



app.get("/", (req, res) => {
  res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description})
})

app.use('/api/products',productsRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

export default app