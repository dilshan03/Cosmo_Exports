import express from "express";
import { createEmployee, loginEmployee } from "../Controlers/UserControllers.js";
import { updateEmployee } from "../Controlers/UserControllers.js";

const userRoute = express.Router();

userRoute.post("/",createEmployee);
userRoute.put("/",updateEmployee);
userRoute.post("/login",loginEmployee);

export default userRoute;