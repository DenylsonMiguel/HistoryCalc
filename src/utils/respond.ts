import type { Response } from "express";

export function respond(
    result: {
        status: number,
        data: object,
        code: string,
    },
    res: Response
) {
    res.status(result.status).json({ data: result.data, code: result.code });
}
