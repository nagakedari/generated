import * as mongoose from "mongoose";
import { logMethod } from "../logging/logger";

class DBUtil {
    @logMethod
    static async connectToDatabase(cachedDb) {
        if (cachedDb && cachedDb.serverConfig.isConnected()) {
            return Promise.resolve(cachedDb);
        }
        cachedDb = await mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
        return cachedDb;
    }
}

export {
    DBUtil
}