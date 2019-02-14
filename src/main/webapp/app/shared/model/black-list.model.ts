import { Moment } from 'moment';

export const enum NumberSource {
    MANUAL = 'MANUAL',
    BATCH = 'BATCH'
}

export interface IBlackList {
    id?: number;
    blacknumber?: string;
    numberSource?: NumberSource;
    validityPeriod?: any;
    addReason?: string;
    applicant?: string;
    createtime?: string;
    changetime?: string;
    checked?: boolean;
    remainPeriod?: string;
}
export interface ISelectBlackList {
    id: number;
    blacknumber: string;
    checked: boolean;
}

export class BlackList implements IBlackList {
    constructor(
        public id?: number,
        public blacknumber?: string,
        public numberSource?: NumberSource,
        public validityPeriod?: any,
        public addReason?: string,
        public applicant?: string,
        public createtime?: string,
        public changetime?: string
    ) {}
}
