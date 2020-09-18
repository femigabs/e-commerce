import { Router } from "express";
import users from "../../routes/users";
import userRouter from "../../routes/auth"
import category from "../../routes/category"
import subCategory from "../../routes/subCategory"
import product from "../../routes/product"
import cart from "../../routes/cart";
import orderDetails from "../../routes/orderDetails"
import transaction from "../../routes/transaction"
import order from "../../routes/order"

const api = Router();

api.use("/auth", users);
api.use("/auth", userRouter);
api.use("/category", category);
api.use("/category", subCategory);
api.use("/", product);
api.use("/cart", cart);
api.use("/", orderDetails);
api.use("/", transaction);
api.use("/order", order);

export default api;