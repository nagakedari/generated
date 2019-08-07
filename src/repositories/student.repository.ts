import { StudentModel, IStudentDocument } from '../schemas/student.schema';
import { BaseRepository, IBaseRepository } from './base.repository';
import { log } from '../logging/logger';

interface IStudentRepository extends IBaseRepository<IStudentDocument> {}

@log
class StudentRepository extends BaseRepository<IStudentDocument> {
    constructor() {
        super(StudentModel);
    }
}
let repository: IStudentRepository = new  StudentRepository();
export {
    repository
}