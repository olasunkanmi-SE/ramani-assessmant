import { pingRouter } from "./routes/api/ping";
import express from "express";
const app = express();

//parse the post request in a json format

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Apis
app.use("/api/ping", pingRouter);

const port = 5000;

//log the application is running on the console
app.listen(port, () => console.log(`Running on port ${port}`));
