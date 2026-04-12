import { Service } from "./calcs.service.js";
import { Router } from "express";
import type { Request, Response } from "express";
import { AppError } from "../../middlewares/errorHandler.js";
import { parse } from "../../utils/parse.js";
import { respond } from "../../utils/respond.js";
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
        .regex(/^[0-9+\-*/().\s]+$/, "Invalid result")
});
const idSchema = z.object({
    id: z
        .string()
        .trim()
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid id")
});

class Controller {
    constructor(private service: Service) {}

    create = async (req: Request, res: Response) => {
        const data = parse(createCalcSchema, req.body);

        const result = await this.service.create(data);
        respond(result, res);
    };

    getAll = async (req: Request, res: Response) => {
        const result = await this.service.getAll();
        respond(result, res);
    };

    getById = async (req: Request, res: Response) => {
        const data = parse(idSchema, req.params);

        const result = await this.service.getById(data);
        respond(result, res);
    };

    delete = async (req: Request, res: Response) => {
        const data = parse(idSchema, req.params);

        const result = await this.service.delete(data);
        respond(result, res);
    };
}

const service = new Service();
const controller = new Controller(service);

const calcRoutes = Router();

calcRoutes.post("", controller.create);
calcRoutes.get("", controller.getAll);
calcRoutes.get("/:id", controller.getById);
calcRoutes.delete("/:id", controller.delete);

export default calcRoutes;
