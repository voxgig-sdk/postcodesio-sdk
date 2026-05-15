package = "voxgig-sdk-postcodesio"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/postcodesio-sdk.git"
}
description = {
  summary = "Postcodesio SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["postcodesio_sdk"] = "postcodesio_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
