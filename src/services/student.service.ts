import { BaseService } from "./base.service";
import { IStudent } from "../models/student.model";
import { repository } from "../repositories/student.repository";
import { log } from "../logging/logger";

interface IStudentService {
    findStudents(): Promise<IStudent[]>;
    findOneStudent(id: number): Promise<IStudent>
}

@log
class StudentService extends BaseService implements IStudentService{
    
    async findStudents(): Promise<IStudent[]> {
        let students: IStudent[] = await repository.find({});
        return students;
    }

    async findOneStudent(id: number): Promise<IStudent> {
        let student: IStudent = await repository.findOne({studentId: id});
        return student;
    }
}

let iStudentService: IStudentService = new StudentService();

export {
    iStudentService
}