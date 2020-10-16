export class User {
    id!: number;
    identifiant!: string;
    password!: string;
    intro!: string;
    email!: string;
    phone!: string;
    priviledge!: string;

    constructor(input: User) {
        Object.assign(this, input);
    }
}
