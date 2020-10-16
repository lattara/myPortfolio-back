import { EducationRepository } from '../repository/education.repository';
import { Education } from 'src/models/education';

export class EducationService {

    private static instance: EducationService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new EducationService();
        }
        return this.instance;
    }

    private repository: EducationRepository;
    private constructor() {
        this.repository = EducationRepository.getInstance();
    }

    getAll(): Promise<Education[]> {
        return this.repository.findAll();
    }

    findById(id: number): Promise<Education> {
        return this.repository.findById(id);
    }

    create(project: any): Promise<Education> {
        return this.repository.insert(project);
    }

    update(project: any): Promise<Education> {
        return this.repository.update(project);
    }

    delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
