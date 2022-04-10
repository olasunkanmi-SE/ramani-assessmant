import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
