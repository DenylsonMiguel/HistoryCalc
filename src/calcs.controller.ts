import { Service } from "./calcs.service.js";
import { Router } from "express";
import type { Request, Response } from "express";
import * as z from "zod";

const createCalcSchema = z.object({
    operation: z
        .string()
        .trim()
        .min(1, "Invalid operation")
        .max(100, "Operation is too long")
        .regex(/^[0-9+\-*/().\s]+$/, "Invalid operation"),
    result: z
        .string()
        .trim()
        .min(1, "Invalid result")
        .max(20, "Result is too long")
        .regex(/^[0-9+\-*/().\s]+$/, "Invalid operation")
});

const service = new Service();
class Controller {
    create = async (req: Request, res: Response) => {
        const parsed = createCalcSchema.safeParse(req.body);

        if (!parsed.success)
            return res.status(400).json({
                errors: parsed.error.issues.map(issue => ({
                    field: issue.path[0] ?? "unknown",
                    message: issue.message
                })),
                code: "BAD_REQUEST"
            });

        const result = await service.create(parsed.data);

        if (result.error)
            return res
                .status(result.status)
                .json({ error: result.error, code: result.code });
        return res.status(result.status).json({
            data: result.data,
            code: result.code
        });
    };

    getAll = async (req: Request, res: Response) => {
        const result = await service.getAll();
        if (result.error)
            return res
                .status(result.status)
                .json({ error: result.error, code: result.code });
        return res.status(result.status).json({
            data: result.data,
            code: result.code
        });
    };
}
const controller = new Controller();

const calcRoutes = Router();

calcRoutes.post("", controller.create);
calcRoutes.get("", controller.getAll);

export default calcRoutes;
