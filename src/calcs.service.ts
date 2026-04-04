import { Calc } from "./calcs.model.js";

export class Service {
    async create(data: { operation: string; result: string }): Promise<{
        status: number;
        data?: object;
        error?: string;
        code: string;
    }> {
        try {
            const calc = new Calc({ operation: data.operation, result: data.result });
            await calc.save();

            const publicCalc = {
                operation: calc.operation,
                result: calc.result,
                id: calc._id as unknown as string
            };
            return { status: 201, data: publicCalc, code: "CREATED" };
        } catch (err) {
            console.error(
                `[ERROR] - Error on POST /calcs ${err}`
            );
            return {
                status: 500,
                error: "Internal Server Error",
                code: "SERVER_ERROR"
            };
        }
    }
}
