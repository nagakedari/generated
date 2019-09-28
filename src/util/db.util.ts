import * as mongoose from "mongoose";
import { logMethod } from "../logging/logger";
import * as AWS from 'aws-sdk';

class DBUtil {
    // @logMethod
    static async connectToDatabase(cachedDb) {
        console.log('****************************log:',14);
        if (cachedDb && cachedDb.serverConfig.isConnected()) {
            console.log('****************************log:',15);
            return Promise.resolve(cachedDb);
        }
        console.log('****************************log:',16);
        let password = await this.getMongoDbPasswordFromParameterStore('mongo_password');
        console.log('username Parameter from store ********* ',process.env.MongoUser);
        let dbUrls = 'mongodb+srv://' + process.env.MongoUser + ':' + password + '@' + 
                    process.env.MongoCluster + '/' + process.env.MongoDBName;
        console.log('URLLLLLLLLLL...........................:',dbUrls)

        let dbUrl = 'mongodb+srv://mongo_user:wAAbUC36OzKcm0hN@cluster0-knpmq.mongodb.net/boilerplate';
        cachedDb = await mongoose.connect(dbUrl, { useNewUrlParser: true });
        return Promise.resolve(cachedDb);
    }

    // @logMethod
    static async getMongoDbPasswordFromParameterStore(parameterName: string): Promise<any> {
        let parameterResponse;
       try {
        let ssmAgent = new AWS.SSM();
        let params = {
            Name: parameterName, 
            WithDecryption: true
          };
        console.log('Before Invoking Parameter from store ********* ');
        parameterResponse = await ssmAgent.getParameter(params);
        console.log('Password Parameter from store ********* ',parameterResponse);
        
       } catch (e){
           console.log('Exception while invoking the parameter store', e);
       }
       return Promise.resolve(parameterResponse);
    }
}

export {
    DBUtil
}