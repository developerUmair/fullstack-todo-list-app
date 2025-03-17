import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo.routes.js";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/v1", todoRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, async () => {
    console.log(
      `Subscription Tracker API is running on http://localhost:${PORT}`
    );
  
    await connectToDatabase();
  });
  
