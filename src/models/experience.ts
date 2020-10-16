export class Experience {
    id!: number;
    title!: string;
    company!: string;
    duration!: string;
    constructor(input: Experience) {
        Object.assign(this, input);
    }
}
