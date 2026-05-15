
import { Context } from './Context'


class PostcodesioError extends Error {

  isPostcodesioError = true

  sdk = 'Postcodesio'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PostcodesioError
}

