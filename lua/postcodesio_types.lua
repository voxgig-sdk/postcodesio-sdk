-- Typed models for the Postcodesio SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Nearest
---@field result table
---@field status number

---@class NearestListMatch
---@field postcode_id string

---@class Outcode
---@field result any
---@field status number

---@class OutcodeLoadMatch
---@field id string

---@class Place
---@field code string
---@field country string
---@field county_unitary string
---@field county_unitary_type string
---@field district_borough string
---@field district_borough_type? string
---@field easting number
---@field latitude number
---@field local_type string
---@field longitude number
---@field max_easting number
---@field max_northing number
---@field min_easting number
---@field min_northing number
---@field name_1 string
---@field name_1_lang string
---@field name_2 string
---@field name_2_lang string
---@field northing number
---@field outcode string
---@field region string
---@field result table
---@field status number

---@class PlaceLoadMatch
---@field id string

---@class PlaceListMatch

---@class Postcode
---@field result table
---@field status number

---@class PostcodeLoadMatch
---@field id string

---@class PostcodeListMatch

---@class PostcodeCreateData

---@class ScottishPostcode
---@field result table
---@field status number

---@class ScottishPostcodeLoadMatch
---@field id string

---@class TerminatedPostcode
---@field result table
---@field status number

---@class TerminatedPostcodeLoadMatch
---@field id string

local M = {}

return M
