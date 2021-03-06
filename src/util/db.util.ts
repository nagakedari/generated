import * as mongoose from "mongoose";
import { logMethod } from "../logging/logger";

class DBUtil {
    @logMethod
    static async connectToDatabase(cachedDb) {
        if (cachedDb && cachedDb.serverConfig.isConnected()) {
            return Promise.resolve(cachedDb);
        }
        let dbUrl = 'mongodb+srv://' + process.env.MongoUser + ':' + process.env.MongoPwd + '@' +
            process.env.MongoCluster + '/' + process.env.MongoDBName;
        cachedDb = await mongoose.connect(dbUrl, { useNewUrlParser: true });
        return Promise.resolve(cachedDb);
    }
}

export {
    DBUtil
}