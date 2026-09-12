import { PostcodesioEntityBase } from '../PostcodesioEntityBase';
import type { PostcodesioSDK } from '../PostcodesioSDK';
import type { Control } from '../types';
import type { Postcode, PostcodeLoadMatch, PostcodeListMatch, PostcodeCreateData } from '../PostcodesioTypes';
declare class PostcodeEntity extends PostcodesioEntityBase<Postcode> {
    constructor(client: PostcodesioSDK, entopts: any);
    make(this: PostcodeEntity): PostcodeEntity;
    load(this: any, reqmatch?: PostcodeLoadMatch, ctrl?: Control): Promise<PostcodeEntity>;
    list(this: any, reqmatch?: PostcodeListMatch, ctrl?: Control): Promise<PostcodeEntity[]>;
    create(this: any, reqdata?: PostcodeCreateData, ctrl?: Control): Promise<PostcodeEntity>;
}
export { PostcodeEntity };
