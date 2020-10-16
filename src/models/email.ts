export class Email {
    name!: string;
    email!: string;
    phone!: string;
    message!: string;

    constructor(input: Email) {
        Object.assign(this, input);
    }
}
