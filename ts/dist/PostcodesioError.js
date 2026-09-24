"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostcodesioError = void 0;
class PostcodesioError extends Error {
    isPostcodesioError = true;
    sdk = 'Postcodesio';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.PostcodesioError = PostcodesioError;
//# sourceMappingURL=PostcodesioError.js.map