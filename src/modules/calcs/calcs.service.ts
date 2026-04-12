import { Calc } from "./calcs.model.js";
import { AppError } from "../../middlewares/errorHandler.js";
import { isValidObjectId } from "mongoose";
import { toPublic } from "../../utils/toPublic.js";
import type { PublicCalc } from "./calcs.model.js";

interface ServiceResponse<T> {
    status: number;
    data: T;
    code: string;
}

export class Service {
    async create(data: {
        operation: string;
        result: string;
    }): Promise<ServiceResponse<PublicCalc>> {
        try {
            const calc = new Calc({
                operation: data.operation,
                result: data.result
            });
            await calc.save();

            const publicCalc = toPublic(calc);
            return { status: 201, data: publicCalc, code: "CREATED" };
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            console.error(`[ERROR] - Error on POST /calcs ${err}`);
            throw new AppError("Internal Server Error");
        }
    }

    async getAll(): Promise<ServiceResponse<PublicCalc[]>> {
        try {
            const calcs = await Calc.find().lean();

            const publicCalcs = calcs.map(toPublic);
            return { status: 200, data: publicCalcs, code: "SUCCESS" };
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            console.error(`[ERROR] - Error on GET /calcs ${err}`);
            throw new AppError("Internal Server Error");
        }
    }

    async getById(data: { id: string }): Promise<ServiceResponse<PublicCalc>> {
        try {
            if (!isValidObjectId(data.id))
                throw new AppError("Invalid ID format", 400, "INVALID_ID");

            const calc = await Calc.findById(data.id).lean();
            if (!calc) throw new AppError("Calc Not Found", 404, "NOT_FOUND");

            const publicCalc = toPublic(calc);

            return {
                status: 200,
                data: publicCalc,
                code: "SUCCESS"
            };
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            console.error(`[ERROR] - Error on GET /calcs/:id ${err}`);
            throw new AppError("Internal Server Error");
        }
    }

    async delete(data: { id: string }): Promise<ServiceResponse<PublicCalc>> {
        try {
            if (!isValidObjectId(data.id))
                throw new AppError("Invalid ID format", 400, "INVALID_ID");

            const calc = await Calc.findByIdAndDelete(data.id);
            if (!calc) throw new AppError("Calc Not Found", 404, "NOT_FOUND");

            const publicCalc = toPublic(calc);

            return {
                status: 200,
                data: publicCalc,
                code: "SUCCESS"
            };
        } catch (err: unknown) {
            if (err instanceof AppError) throw err;
            console.error(`[ERROR] - Error on DELETE /calcs/:id ${err}`);
            throw new AppError("Internal Server Error");
        }
    }
}
