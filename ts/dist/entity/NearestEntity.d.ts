import { PostcodesioEntityBase } from '../PostcodesioEntityBase';
import type { PostcodesioSDK } from '../PostcodesioSDK';
import type { Control } from '../types';
import type { Nearest, NearestListMatch } from '../PostcodesioTypes';
declare class NearestEntity extends PostcodesioEntityBase<Nearest> {
    constructor(client: PostcodesioSDK, entopts: any);
    make(this: NearestEntity): NearestEntity;
    list(this: any, reqmatch?: NearestListMatch, ctrl?: Control): Promise<NearestEntity[]>;
}
export { NearestEntity };
