interface Issue {
    field: string;
    message: string;
}

export class AppError extends Error {
    status: number;
    code: string;
    errors: Issue[] = [];

    constructor(
        message: string,
        status = 500,
        code = "INTERNAL_ERROR",
        errors?: Issue[]
    ) {
        super(message);
        this.status = status;
        this.code = code;
        if (errors) this.errors = errors;
    }
}
