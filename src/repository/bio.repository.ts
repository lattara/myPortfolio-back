import { Bio } from '../models/bio';
import { MysqlConnection } from '../loaders/mysql';

export class BioRepository {

    private static instance: BioRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'bio';

    static getInstance() {
        if (!this.instance) {
            this.instance = new BioRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    // Find all bio
    findBio(): Promise<Bio> {
        return this.connection.query(`SELECT * from ${this.table}`)
        .then((results: any) => {
            return results.map((bio: any) => new Bio(bio));
        });
    }

    // Modify ToolboxItem
    updateBio(bio: Bio) {
    return this.connection.query(
        `UPDATE ${this.table} SET intro = ?, cv_link = ?, image_link = ?  WHERE id = 1`,
        [bio.intro, bio.cvLink, bio.profileImgLink]);
    }

}
