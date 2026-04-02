import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";
// APP
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

// ROUTES
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to History Calc" });
});

// START
if (!process.env.PORT) throw new Error("Missing enviorment variable PORT");
app.listen(process.env.PORT, () =>
    console.log(`[LOG] - Server started on ${process.env.PORT}`)
);
