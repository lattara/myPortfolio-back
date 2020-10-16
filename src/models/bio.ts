export class Bio {
    id!: number;
    intro!: string;
    cvLink!: string;
    profileImgLink!: string;
    constructor(input: Bio) {
        Object.assign(this, input);
    }
}