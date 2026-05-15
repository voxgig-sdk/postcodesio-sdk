# Postcodesio SDK utility: make_context
require_relative '../core/context'
module PostcodesioUtilities
  MakeContext = ->(ctxmap, basectx) {
    PostcodesioContext.new(ctxmap, basectx)
  }
end
