import express from "express";
import imoveisRouter from "./routes/imoveis.router";
import userRouter from "./routes/user.controlle";

const app = express();

app.use(express.json());

app.use("/imoveis", imoveisRouter);
app.use("/user", userRouter);

export default app;
