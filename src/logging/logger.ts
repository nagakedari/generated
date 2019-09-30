import * as moment from 'moment';

class Logger {

    info(content: string) {
        console.log(content);
    }

    debug(content: string) {
        console.debug(content);
    }

    error(content: string) {
        console.error(content);
    }
}

let logger = new Logger();

function log(target: Function): any {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        const isMethod = descriptor.value instanceof Function;
        if (!isMethod) {
            continue;
        }
        logMethod(target, propertyName, descriptor);
    }
}

function logMethod(target: Function, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): any {
    let entryMessage: string = 'Method Entry: ' + target.name + '.' + propertyKey.toString();
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        let result;
        try {
            logger.debug(entryMessage);
            let startTime = moment();
            let duration;
            result = originalMethod.apply(this, args);
            logger.debug('********result****** '+ result);
            if (result instanceof Promise) {
                result.then(() => {
                    logger.debug('********Promise Resolved****** ');
                    duration = moment.duration(moment().diff(startTime));
                    let exitMessage: string = 'Method exit: ' + target.name + '.' + propertyKey.toString();
                    exitMessage += '. Took ' + duration.asMilliseconds() + ' milli seconds';
                    logger.debug(exitMessage);
                }, err => {
                    let exceptionMessage = 'Exception occured in: ' + target.name + '.' + propertyKey.toString() + '\n';
                    logger.debug(exceptionMessage);
                    logger.debug(err.toString());
                });
            } else {
                logger.debug('********Not a Promise****** ');
                duration = moment.duration(moment().diff(startTime));
                let exitMessage: string = 'Method exit: ' + target.name + '.' + propertyKey.toString();
                exitMessage += '. Took ' + duration.asMilliseconds() + ' milli seconds';
                logger.debug(exitMessage);
            }
            return result;
        } catch (err) {
            let exceptionMessage = 'Exception occured in: ' + target.name + '.' + propertyKey.toString() + '\n';
            logger.debug(exceptionMessage);
            logger.debug(err.toString());
        }
    }
    Object.defineProperty(target.prototype, propertyKey, descriptor);
}


export {
    log,
    logger,
    logMethod
}