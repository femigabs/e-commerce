import { Router } from "express";
import users from "../../routes/users";
import userRouter from "../../routes/auth"
import category from "../../routes/category"
import subCategory from "../../routes/subCategory"
import product from "../../routes/product"

const api = Router();

api.use("/auth", users);
api.use("/auth", userRouter);
api.use("/category", category);
api.use("/category/sub", subCategory);
api.use("/", product);

export default api;