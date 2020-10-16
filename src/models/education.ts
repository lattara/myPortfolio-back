export class Education {
    id!: number;
    diploma_name!: string;
    school!: string;

    constructor(input: Education) {
        Object.assign(this, input);
    }
}
