"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const post_controller_1 = require("./../../controllers/post-controller");
const express_1 = __importDefault(require("express"));
exports.postRouter = express_1.default.Router();
//Call Post get API
exports.postRouter.get("/", post_controller_1.PostController.getPosts);
//# sourceMappingURL=post.js.map