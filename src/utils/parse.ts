import { AppError } from "../middlewares/errorHandler.js";

export function parse(schema: any, data: any) {
    const parsed = schema.safeParse(data);

    if (!parsed.success)
        throw new AppError(
            "Validation Error",
            400,
            "BAD_REQUEST",
            parsed.error.issues.map((issue: any) => ({
                field: issue.path[0]?.toString() ?? "unknown",
                message: issue.message
            }))
        );

    return parsed.data;
}
