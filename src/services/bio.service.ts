import { BioRepository } from '../repository/bio.repository';
import { Bio } from 'src/models/bio';

export class BioService {

    private static instance: BioService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new BioService();
        }
        return this.instance;
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private repository: BioRepository;
    private constructor() {
        this.repository = BioRepository.getInstance();
    }

    getBio(): Promise<Bio> {
        return this.repository.findBio();
    }

    update(bio: Bio): Promise<any> {
        return this.repository.updateBio(bio);
    }

}
