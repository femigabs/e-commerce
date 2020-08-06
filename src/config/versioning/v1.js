import { Router } from "express";
import users from "../../routes/users";
import userRouter from "../../routes/auth"


const api = Router();

api.use("/auth", users);
api.use("/auth", userRouter);

export default api;