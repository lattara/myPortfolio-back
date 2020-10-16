import { Project } from '../models/project';
import { ProjectsRepository } from '../repository/projects.repository';

export class ProjectsService {

    private static instance: ProjectsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectsService();
        }
        return this.instance;
    }

    private repository: ProjectsRepository;
    private constructor() {
        this.repository = ProjectsRepository.getInstance();
    }

    getAll(): Promise<Project[]> {
        return this.repository.findAll();
    }

    getById(id: number): Promise<Project> {
        return this.repository.findById(id);
    }

    create(project: any): Promise<Project> {
      return this.repository.insert(project);
    }

    update(project: any): Promise<Project> {
      return this.repository.update(project);
    }

    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
