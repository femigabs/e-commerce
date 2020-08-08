import { Router } from "express";
import users from "../../routes/users";
import userRouter from "../../routes/auth"
import category from "../../routes/category"


const api = Router();

api.use("/auth", users);
api.use("/auth", userRouter);
api.use("/category", category)

export default api;