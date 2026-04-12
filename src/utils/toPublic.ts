export function toPublic(calc: any) {
    return {
        operation: calc.operation,
        result: calc.result,
        id: calc._id.toString()
    };
}
