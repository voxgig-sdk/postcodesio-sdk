# frozen_string_literal: true

# Typed models for the Postcodesio SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Nearest entity data model.
#
# @!attribute [rw] result
#   @return [Array]
#
# @!attribute [rw] status
#   @return [Integer]
Nearest = Struct.new(
  :result,
  :status,
  keyword_init: true
)

# Request payload for Nearest#list.
#
# @!attribute [rw] postcode_id
#   @return [String]
NearestListMatch = Struct.new(
  :postcode_id,
  keyword_init: true
)

# Outcode entity data model.
#
# @!attribute [rw] result
#   @return [Object]
#
# @!attribute [rw] status
#   @return [Integer]
Outcode = Struct.new(
  :result,
  :status,
  keyword_init: true
)

# Request payload for Outcode#load.
#
# @!attribute [rw] id
#   @return [String]
OutcodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Place entity data model.
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] county_unitary
#   @return [String]
#
# @!attribute [rw] county_unitary_type
#   @return [String]
#
# @!attribute [rw] district_borough
#   @return [String]
#
# @!attribute [rw] district_borough_type
#   @return [String, nil]
#
# @!attribute [rw] easting
#   @return [Integer]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] local_type
#   @return [String]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] max_easting
#   @return [Integer]
#
# @!attribute [rw] max_northing
#   @return [Integer]
#
# @!attribute [rw] min_easting
#   @return [Integer]
#
# @!attribute [rw] min_northing
#   @return [Integer]
#
# @!attribute [rw] name_1
#   @return [String]
#
# @!attribute [rw] name_1_lang
#   @return [String]
#
# @!attribute [rw] name_2
#   @return [String]
#
# @!attribute [rw] name_2_lang
#   @return [String]
#
# @!attribute [rw] northing
#   @return [Integer]
#
# @!attribute [rw] outcode
#   @return [String]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [Integer]
Place = Struct.new(
  :code,
  :country,
  :county_unitary,
  :county_unitary_type,
  :district_borough,
  :district_borough_type,
  :easting,
  :latitude,
  :local_type,
  :longitude,
  :max_easting,
  :max_northing,
  :min_easting,
  :min_northing,
  :name_1,
  :name_1_lang,
  :name_2,
  :name_2_lang,
  :northing,
  :outcode,
  :region,
  :result,
  :status,
  keyword_init: true
)

# Request payload for Place#load.
#
# @!attribute [rw] id
#   @return [String]
PlaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Place#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] county_unitary
#   @return [String, nil]
#
# @!attribute [rw] county_unitary_type
#   @return [String, nil]
#
# @!attribute [rw] district_borough
#   @return [String, nil]
#
# @!attribute [rw] district_borough_type
#   @return [String, nil]
#
# @!attribute [rw] easting
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] local_type
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] max_easting
#   @return [Integer, nil]
#
# @!attribute [rw] max_northing
#   @return [Integer, nil]
#
# @!attribute [rw] min_easting
#   @return [Integer, nil]
#
# @!attribute [rw] min_northing
#   @return [Integer, nil]
#
# @!attribute [rw] name_1
#   @return [String, nil]
#
# @!attribute [rw] name_1_lang
#   @return [String, nil]
#
# @!attribute [rw] name_2
#   @return [String, nil]
#
# @!attribute [rw] name_2_lang
#   @return [String, nil]
#
# @!attribute [rw] northing
#   @return [Integer, nil]
#
# @!attribute [rw] outcode
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
PlaceListMatch = Struct.new(
  :code,
  :country,
  :county_unitary,
  :county_unitary_type,
  :district_borough,
  :district_borough_type,
  :easting,
  :latitude,
  :local_type,
  :longitude,
  :max_easting,
  :max_northing,
  :min_easting,
  :min_northing,
  :name_1,
  :name_1_lang,
  :name_2,
  :name_2_lang,
  :northing,
  :outcode,
  :region,
  :result,
  :status,
  keyword_init: true
)

# Postcode entity data model.
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [Integer]
Postcode = Struct.new(
  :result,
  :status,
  keyword_init: true
)

# Request payload for Postcode#load.
#
# @!attribute [rw] id
#   @return [String]
PostcodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Postcode#list.
#
# @!attribute [rw] result
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
PostcodeListMatch = Struct.new(
  :result,
  :status,
  keyword_init: true
)

# Request payload for Postcode#create.
#
# @!attribute [rw] result
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [Integer]
PostcodeCreateData = Struct.new(
  :result,
  :status,
  keyword_init: true
)

# ScottishPostcode entity data model.
#
# @!attribute [rw] result
#   @return [Array]
#
# @!attribute [rw] status
#   @return [Integer]
ScottishPostcode = Struct.new(
  :result,
  :status,
  keyword_init: true
)

# Request payload for ScottishPostcode#load.
#
# @!attribute [rw] id
#   @return [String]
ScottishPostcodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# TerminatedPostcode entity data model.
#
# @!attribute [rw] result
#   @return [Array]
#
# @!attribute [rw] status
#   @return [Integer]
TerminatedPostcode = Struct.new(
  :result,
  :status,
  keyword_init: true
)

# Request payload for TerminatedPostcode#load.
#
# @!attribute [rw] id
#   @return [String]
TerminatedPostcodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

