import * as mongoose from "mongoose";
import { logMethod } from "../logging/logger";
import * as AWS from 'aws-sdk';

class DBUtil {
    @logMethod
    static async connectToDatabase(cachedDb) {
        console.log('****************************log:',14);
        if (cachedDb && cachedDb.serverConfig.isConnected()) {
            console.log('****************************log:',15);
            return Promise.resolve(cachedDb);
        }
        console.log('****************************log:',16);
        let password = this.getMongoDbPasswordFromParameterStore('mongo_password');
        console.log('username Parameter from store ********* ',process.env.MongoUser);
        let dbUrl = 'mongodb+srv://' + process.env.MongoUser + ':' + password + '@' + 
                    process.env.MongoCluster + '/' + process.env.MongoDBName;
        console.log('URLLLLLLLLLL...........................:',dbUrl)
        cachedDb = await mongoose.connect(dbUrl, { useNewUrlParser: true });
        return cachedDb;
    }

    @logMethod
    static async getMongoDbPasswordFromParameterStore(parameterName: string): Promise<any> {
       
            let ssmAgent = new AWS.SSM();
            let params = {
                Name: parameterName, 
                WithDecryption: true
              };
            let parameterResponse = await ssmAgent.getParameter(params);
            console.log('Password Parameter from store ********* ',parameterResponse);
    }
}

export {
    DBUtil
}