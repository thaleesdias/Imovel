import express from "express";
import imoveisRouter from "./routes/imoveis.routes";
import userRouter from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use("/imoveis", imoveisRouter);
app.use("/users", userRouter);

export default app;
