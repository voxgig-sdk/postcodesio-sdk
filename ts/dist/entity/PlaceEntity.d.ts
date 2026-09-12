import { PostcodesioEntityBase } from '../PostcodesioEntityBase';
import type { PostcodesioSDK } from '../PostcodesioSDK';
import type { Control } from '../types';
import type { Place, PlaceLoadMatch, PlaceListMatch } from '../PostcodesioTypes';
declare class PlaceEntity extends PostcodesioEntityBase<Place> {
    constructor(client: PostcodesioSDK, entopts: any);
    make(this: PlaceEntity): PlaceEntity;
    load(this: any, reqmatch?: PlaceLoadMatch, ctrl?: Control): Promise<PlaceEntity>;
    list(this: any, reqmatch?: PlaceListMatch, ctrl?: Control): Promise<PlaceEntity[]>;
}
export { PlaceEntity };
