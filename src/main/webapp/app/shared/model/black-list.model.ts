export const enum NumberSource {
    MANUAL = 'MANUAL',
    BATCH = 'BATCH'
}

export interface IBlackList {
    id?: number;
    blacknumber?: string;
    numberSource?: NumberSource;
    validityPeriod?: number;
    addReason?: string;
    applicant?: string;
    createtime?: string;
    changetime?: string;
}

export class BlackList implements IBlackList {
    constructor(
        public id?: number,
        public blacknumber?: string,
        public numberSource?: NumberSource,
        public validityPeriod?: number,
        public addReason?: string,
        public applicant?: string,
        public createtime?: string,
        public changetime?: string
    ) {}
}
