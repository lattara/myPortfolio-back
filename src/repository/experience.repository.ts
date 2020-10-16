import { Experience } from '../models/experience';
import { MysqlConnection } from '../loaders/mysql';

export class ExperienceRepository {

    private static instance: ExperienceRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'experience';

    static getInstance() {
        if (!this.instance) {
            this.instance = new ExperienceRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    // Find all experiences
    findExperiences(): Promise<Experience[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
            .then((results: any) => {
                return results.map((experience: any) => new Experience(experience));
            });
    }

    // Find experience by ID
    findById(id: number): Promise<Experience> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
            .then((results: any) => new Experience(results[0]));
    }

    // create experience
    insert(experience: Experience) {
        return this.connection.query(
            `INSERT INTO ${this.table} (title, company, duration) VALUES (?,?,?)`,
            [experience.title, experience.company, experience.duration],
        ).then((result: any) => {
            // After an insert the insert id is directly passed in the promise
            return this.findById(result.insertId);
        });
    }

    // modify experience
    update(experience: Experience) {
        return this.connection.query(
            'UPDATE projects SET title = ?, company = ?,  duration = ? WHERE id = ?',
            [experience.title, experience.company, experience.duration],
        ).then(() => {
            return this.findById(experience.id);
        });
    }

    delete(id: number): Promise<any> {
        return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }

}
