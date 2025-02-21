import express, { Router } from "express";
import UserController from "../controllers/UserController";
import { AuthRequest } from "../middlewares/auth";

const userRouter = Router();

const userController = new UserController()

userRouter.post("/", userController.create)
userRouter.get("/", userController.getAll)
userRouter.get("/:id", userController.getById) 
    
export default userRouter;
