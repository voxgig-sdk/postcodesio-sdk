import { PostcodesioEntityBase } from '../PostcodesioEntityBase';
import type { PostcodesioSDK } from '../PostcodesioSDK';
import type { Control } from '../types';
import type { ScottishPostcode, ScottishPostcodeLoadMatch } from '../PostcodesioTypes';
declare class ScottishPostcodeEntity extends PostcodesioEntityBase<ScottishPostcode> {
    constructor(client: PostcodesioSDK, entopts: any);
    make(this: ScottishPostcodeEntity): ScottishPostcodeEntity;
    load(this: any, reqmatch?: ScottishPostcodeLoadMatch, ctrl?: Control): Promise<ScottishPostcodeEntity>;
}
export { ScottishPostcodeEntity };
