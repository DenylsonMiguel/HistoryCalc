import mongoose from "mongoose";

interface ICalc {
    operation: string;
    result: string;
}
const calcSchema = new mongoose.Schema<ICalc>({
    operation: { type: String, required: true },
    result: { type: String, required: true }
});
export const Calc = mongoose.model<ICalc>("Calc", calcSchema);
