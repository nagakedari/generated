import { Handler, APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { DBUtil } from '../util/db.util';
import { logger } from '../logging/logger';
import { PATH_PARAMETERS, ID, HTTP_METHOD, PATH, METHOD_NOT_ALLOWED } from '../util/constants';
import { iStudentService } from '../services/student.service';

let cachedDb;

let itemHandlers = {
    GET: {
        students: iStudentService.findOneStudent
    }
}

let collectionHandlers = {
    GET: {
        students: iStudentService.findStudents
    }
}

export const handler: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    try {
        console.log('****************************log:',1);
        context.callbackWaitsForEmptyEventLoop = false;
        console.log('****************************log:',2);
        await DBUtil.connectToDatabase(cachedDb);
        console.log('****************************log:',3);
        let id = (event[PATH_PARAMETERS] && ID in event[PATH_PARAMETERS]) ? event[PATH_PARAMETERS][ID] : undefined;
        console.log('****************************log:',4);
        let httpMethod: string = event[HTTP_METHOD];
        console.log('****************************log:',5);
        let path: string = event[PATH];
        console.log('****************************log:',6);
        let result, isValidHttpMethod: boolean;
        if (id) {
            console.log('****************************log:',7);
            if (httpMethod in itemHandlers) {
                console.log('****************************log:',8);
                isValidHttpMethod = true;
                let lastIndex = path.lastIndexOf('/');
                let operation: string = path.substring(1, lastIndex);
                result = await itemHandlers[httpMethod][operation](id);
                console.log('****************************log:',9);
            }
        } else {
            console.log('****************************log:',10);
            if (httpMethod in collectionHandlers) {
                console.log('****************************log:',11);
                isValidHttpMethod = true;
                let operation: string = path.split('/').pop();
                result = await collectionHandlers[httpMethod][operation]();
                console.log('****************************log:',12);
            }
        }
        console.log('****************************log:',13);
        return isValidHttpMethod ? cb(null, { statusCode: 200, body: JSON.stringify(result) }) : cb(null, { statusCode: 405, body: JSON.stringify({ message: `${METHOD_NOT_ALLOWED}` }) });
    } catch (err) {
        let errObj = {
            isBase64Encoded: false,
            statusCode: 500,
            headers: {},
            body: JSON.stringify(err)
        }
        console.log("#################err:", err);
        logger.debug(errObj.body);
        cb(null, errObj);
    }
}