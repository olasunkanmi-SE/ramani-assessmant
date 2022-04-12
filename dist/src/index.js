"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const ping_1 = require("./routes/api/ping");
const post_1 = require("./routes/api/post");
//parse the post request in a json format
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Apis
app.use("/api/ping", ping_1.pingRouter);
app.use("/api/post", post_1.postRouter);
const port = 5000;
//log the application is running on the console
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map