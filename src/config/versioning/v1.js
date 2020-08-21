import { Router } from "express";
import users from "../../routes/users";
import userRouter from "../../routes/auth"
import category from "../../routes/category"
import subCategory from "../../routes/subCategory"
import product from "../../routes/product"
import cart from "../../routes/cart";
import orderDetails from "../../routes/orderDetails"

const api = Router();

api.use("/auth", users);
api.use("/auth", userRouter);
api.use("/category", category);
api.use("/category/sub", subCategory);
api.use("/", product);
api.use("/cart", cart);
api.use("/order_details", orderDetails);

export default api;