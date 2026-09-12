import { Context } from './Context';
declare class PostcodesioError extends Error {
    isPostcodesioError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { PostcodesioError };
