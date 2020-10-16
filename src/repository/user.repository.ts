import { User } from '../models/user';
import { MysqlConnection } from '../loaders/mysql';

export class UserRepository {

    private static instance: UserRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'user';

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    // Find user by ID
    findById(id: number): Promise<User> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
            .then((results: any) => new User(results[0]));
    }
    // find by username or email
    findByIdentifiant(identifiant: string) {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE identifiant = ?`, [identifiant])
        .then((results: any) => new User(results[0]));
    }

    checkUsersCredts(user: User) {
        const pass = user.password;
        const identifiant = user.identifiant;
        return this.connection.query(`SELECT * FROM ${this.table} where identifiant = ? AND password = ?`, [identifiant, pass])
        .then((results: any) => new User(results[0]));
    }

    insert(user: User) {
        return this.connection.query(
            `INSERT INTO ${this.table} (identifiant, password, intro, email, phone, priviledge) VALUES (?,?,?,?,?,?)`,
            [user.identifiant, user.password, user.intro, user.email, user.phone, user.priviledge ],
        ).then((result: any) => {
            return this.findById(result.insertId);
        });
    }
}
