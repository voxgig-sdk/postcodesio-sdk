import { NearestEntity } from './entity/NearestEntity';
import { OutcodeEntity } from './entity/OutcodeEntity';
import { PlaceEntity } from './entity/PlaceEntity';
import { PostcodeEntity } from './entity/PostcodeEntity';
import { ScottishPostcodeEntity } from './entity/ScottishPostcodeEntity';
import { TerminatedPostcodeEntity } from './entity/TerminatedPostcodeEntity';
export type * from './PostcodesioTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PostcodesioEntityBase } from './PostcodesioEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PostcodesioSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Nearest(entopts?: Record<string, any>): NearestEntity;
    Outcode(entopts?: Record<string, any>): OutcodeEntity;
    Place(entopts?: Record<string, any>): PlaceEntity;
    Postcode(entopts?: Record<string, any>): PostcodeEntity;
    ScottishPostcode(entopts?: Record<string, any>): ScottishPostcodeEntity;
    TerminatedPostcode(entopts?: Record<string, any>): TerminatedPostcodeEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PostcodesioSDK;
    tester(testopts?: any, sdkopts?: any): PostcodesioSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PostcodesioSDK;
export { stdutil, config, BaseFeature, PostcodesioEntityBase, PostcodesioSDK, SDK, };
