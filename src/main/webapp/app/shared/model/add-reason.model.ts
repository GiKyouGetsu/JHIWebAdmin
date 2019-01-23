export interface IAddReason {
    id?: number;
    reason?: string;
}

export class AddReason implements IAddReason {
    constructor(public id?: number, public reason?: string) {}
}
