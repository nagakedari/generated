import { Document } from "mongoose";
import { log } from "../logging/logger";

interface IBaseRepository<T> {
    find(query: Object): Promise<T[]>;
    findOne(query: Object): Promise<T>;
    findOneAndUpdate(query: Object, data: T, upsert?: boolean): Promise<T>;
    save(data: T): Promise<T>;
    update(data: T): Promise<T>;
}

@log
class BaseRepository<T extends Document> implements IBaseRepository<T> {
    private document: T;

    constructor(document: T) {
        this.document = document;
    }

    find(query: Object): Promise<T[]>{
        return this.document.find(query);
    }

    findOne(query: Object): Promise<T> {
        return this.document.findOne(query);
    }

    findOneAndUpdate(query: Object, data: T, upsert?: boolean): Promise<T> {
        return this.document.findOneAndUpdate(query, data, {new: true}, upsert).exec();
    }

    save(data: T): Promise<T> {
        let document = new this.document(data);
        return document.save();
    }

    update(data: T): Promise<T> {
        return this.document.updateOne({_id: data._id}, data);
    }
}

export {
    IBaseRepository,
    BaseRepository
}