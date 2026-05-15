-- Postcodesio SDK error

local PostcodesioError = {}
PostcodesioError.__index = PostcodesioError


function PostcodesioError.new(code, msg, ctx)
  local self = setmetatable({}, PostcodesioError)
  self.is_sdk_error = true
  self.sdk = "Postcodesio"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PostcodesioError:error()
  return self.msg
end


function PostcodesioError:__tostring()
  return self.msg
end


return PostcodesioError
