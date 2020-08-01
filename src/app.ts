import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import router from "./router";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

export default app;
