import { Experience } from '../models/experience';
import {ExperienceRepository } from '../repository/experience.repository';

export class ExperienceService {

    private static instance: ExperienceService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ExperienceService();
        }
        return this.instance;
    }

    private repository: ExperienceRepository;
    private constructor() {
        this.repository = ExperienceRepository.getInstance();
    }

    getAll(): Promise<Experience[]> {
        return this.repository.findExperiences();
    }

    getById(id: number): Promise<Experience> {
        return this.repository.findById(id);
    }

    create(experience: any): Promise<Experience> {
        return this.repository.insert(experience);
    }

    update(experience: any): Promise<Experience> {
        return this.repository.update(experience);
    }

    delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
