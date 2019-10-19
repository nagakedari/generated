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
        context.callbackWaitsForEmptyEventLoop = false;
        await DBUtil.connectToDatabase(cachedDb);
        let id = (event[PATH_PARAMETERS] && ID in event[PATH_PARAMETERS]) ? event[PATH_PARAMETERS][ID] : undefined;
        let httpMethod: string = event[HTTP_METHOD];
        let path: string = event[PATH];
        let result, isValidHttpMethod: boolean;
        if (id) {
            if (httpMethod in itemHandlers) {
                isValidHttpMethod = true;
                let lastIndex = path.lastIndexOf('/');
                let operation: string = path.substring(1, lastIndex);
                result = await itemHandlers[httpMethod][operation](id);
            }
        } else {
            if (httpMethod in collectionHandlers) {
                isValidHttpMethod = true;
                let operation: string = path.split('/').pop();
                result = await collectionHandlers[httpMethod][operation]();
            }
        }
        if(isValidHttpMethod) {
            cb(null, { statusCode: 200, body: JSON.stringify(result) });
        } else {
            cb(null, { statusCode: 405, body: JSON.stringify({ message: `${METHOD_NOT_ALLOWED}` }) });
        }
        return;
    } catch (err) {
        logger.debug('ERROR caught in handler *****'+ err);
        let errObj = {
            isBase64Encoded: false,
            statusCode: 500,
            headers: {},
            body: JSON.stringify(err)
        }
        logger.debug(errObj.body);
        cb(null, errObj);
    }
}