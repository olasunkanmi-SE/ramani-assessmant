import { verifyCache } from "./../../middlewares/index";
import { PostController } from "./../../controllers/post-controller";
import express from "express";
export const postRouter = express.Router();
//Call Post get API
postRouter.get("/", verifyCache, PostController.getPosts);
