import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import calcRoutes from "./calcs.controller.js";
import { jsonErrorHandler } from "./middlewares/jsonError.js";
import "dotenv/config";
import "./config/db.js";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(jsonErrorHandler);
app.use(helmet());
app.use(morgan("combined"));

// ROUTES
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to History Calc" });
});
app.use("/calcs", calcRoutes);

// POS-MIDDLEWARES
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Invalid route",
        code: "NOT_FOUND",
        method: req.method,
        path: req.originalUrl
    });
});

// START
if (!process.env.PORT) throw new Error("Missing enviorment variable PORT");
app.listen(process.env.PORT, () =>
    console.log(`[LOG] - Server started on ${process.env.PORT}`)
);
