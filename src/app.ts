import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./router";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import bodyParser from 'body-parser';


const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api", router);


app.use(globalErrorHandler);



export default app;
