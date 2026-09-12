import { PostcodesioEntityBase } from '../PostcodesioEntityBase';
import type { PostcodesioSDK } from '../PostcodesioSDK';
import type { Control } from '../types';
import type { Outcode, OutcodeLoadMatch } from '../PostcodesioTypes';
declare class OutcodeEntity extends PostcodesioEntityBase<Outcode> {
    constructor(client: PostcodesioSDK, entopts: any);
    make(this: OutcodeEntity): OutcodeEntity;
    load(this: any, reqmatch?: OutcodeLoadMatch, ctrl?: Control): Promise<OutcodeEntity>;
}
export { OutcodeEntity };
