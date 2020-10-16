import { Education } from '../models/education';
import { MysqlConnection } from '../loaders/mysql';

export class EducationRepository {

    private static instance: EducationRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'education';

    static getInstance() {
        if (!this.instance) {
            this.instance = new EducationRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    // Find all from education
    findAll(): Promise<Education[]> {
        return this.connection.query(`SELECT * FROM ${this.table}`)
            .then((results: any) => {
                return results.map((education: any) => new Education(education));
            });
    }

    // Find education by ID
    findById(id: number): Promise<Education> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
            .then((results: any) => new Education(results[0]));
    }

    // create education
    insert(education: Education) {
        return this.connection.query(
            `INSERT INTO ${this.table} (diploma_name, school) VALUES (?,?)`,
            [education.diploma_name, education.school],
        ).then((result: any) => {
            // After an insert the insert id is directly passed in the promise
            return this.findById(result.insertId);
        });
    }

    // modify education
    update(education: Education) {
        return this.connection.query(
            'UPDATE projects SET diploma_name = ?, school = ? WHERE id = ?',
            [education.diploma_name, education.school],
        ).then(() => {
            return this.findById(education.id);
        });
    }

    // Make a query to the database to delete an existing eductation

    delete(id: number): Promise<any> {
        return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }

}
