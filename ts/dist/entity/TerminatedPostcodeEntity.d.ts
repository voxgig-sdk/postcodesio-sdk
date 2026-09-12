import { PostcodesioEntityBase } from '../PostcodesioEntityBase';
import type { PostcodesioSDK } from '../PostcodesioSDK';
import type { Control } from '../types';
import type { TerminatedPostcode, TerminatedPostcodeLoadMatch } from '../PostcodesioTypes';
declare class TerminatedPostcodeEntity extends PostcodesioEntityBase<TerminatedPostcode> {
    constructor(client: PostcodesioSDK, entopts: any);
    make(this: TerminatedPostcodeEntity): TerminatedPostcodeEntity;
    load(this: any, reqmatch?: TerminatedPostcodeLoadMatch, ctrl?: Control): Promise<TerminatedPostcodeEntity>;
}
export { TerminatedPostcodeEntity };
