import mongoose from "mongoose";

if (!process.env.DB_URI) throw new Error("Missing enviorment variable DB_URI");

async function configdb() {
    try {
        await mongoose.connect(process.env.DB_URI!);
        console.log(`[LOG] - DB connected`);
    } catch (err) {
        console.error(`[ERROR] - Error on configdb: ${err}`);
    }
}

configdb();
