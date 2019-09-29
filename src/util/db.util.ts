import * as mongoose from "mongoose";
import { logMethod } from "../logging/logger";
import * as AWS from 'aws-sdk';

class DBUtil {
    // @logMethod
    static async connectToDatabase(cachedDb) {
        console.log('****************************log:', 14);
        if (cachedDb && cachedDb.serverConfig.isConnected()) {
            console.log('****************************log:', 15);
            return Promise.resolve(cachedDb);
        }
        console.log('****************************log:', 16);
        let ssmAgent = new AWS.SSM();
                let params = {
                    Name: 'mongo_password',
                    WithDecryption: true
                };
        let password = await ssmAgent.getParameter(params).promise();
        console.log('*****************password******** ', password);
        console.log('username Parameter from store ********* ', process.env.MongoUser);
        let dbUrls = 'mongodb+srv://' + process.env.MongoUser + ':' + password + '@' +
            process.env.MongoCluster + '/' + process.env.MongoDBName;
        console.log('URLLLLLLLLLL...........................:', dbUrls)

        let dbUrl = 'mongodb+srv://mongo_user:wAAbUC36OzKcm0hN@cluster0-knpmq.mongodb.net/boilerplate';
        cachedDb = await mongoose.connect(dbUrl, { useNewUrlParser: true });
        return Promise.resolve(cachedDb);
    }

    // @logMethod
    // static async getMongoDbPasswordFromParameterStore(parameterName: string): Promise<any> {
    //     // return new Promise((resolve, reject) => {
    //         let response;
    //         try {
    //             let ssmAgent = new AWS.SSM();
    //             let params = {
    //                 Name: parameterName,
    //                 WithDecryption: true
    //             };
    //             console.log('Before Invoking Parameter from store ********* ');
    //             // ssmAgent.getParameter(params, function (err, data) {
    //             //     if (err) {
    //             //         console.log('errrrrrrrrrrrrrrr******* ', err);
    //             //         reject(err);
    //             //     } else {
    //             //         resolve(data);
    //             //         console.log('Password Parameter from store ********* ', data);
    //             //     }
    //             // });
    //         response = await ssmAgent.getParameter(params).promise( );

    //         } catch (e) {
    //             console.log('Exception while invoking the parameter store', e);
    //         }
    //     // });
    // return response.Parameter.Value;
    // }
}

export {
    DBUtil
}