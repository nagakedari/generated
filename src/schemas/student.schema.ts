
import * as mongoose from "mongoose";

import { IStudent } from "../models/student.model";
import { STUDENT_COLLECTION } from "../util/constants";

const studentSchema: mongoose.Schema = new mongoose.Schema({
    /**
    * define schema attributes and types
    */
});

interface IStudentDocument extends IStudent, mongoose.Document {

}

const StudentModel: IStudentDocument = mongoose.model<IStudentDocument>(STUDENT_COLLECTION, studentSchema);

export {
    StudentModel,
    IStudentDocument
}