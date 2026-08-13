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
class Outcode
end

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
# @!attribute [rw] eastings
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
# @!attribute [rw] max_eastings
#   @return [Integer]
#
# @!attribute [rw] max_northings
#   @return [Integer]
#
# @!attribute [rw] min_eastings
#   @return [Integer]
#
# @!attribute [rw] min_northings
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
# @!attribute [rw] northings
#   @return [Integer]
#
# @!attribute [rw] outcode
#   @return [String]
#
# @!attribute [rw] region
#   @return [String]
Place = Struct.new(
  :code,
  :country,
  :county_unitary,
  :county_unitary_type,
  :district_borough,
  :district_borough_type,
  :eastings,
  :latitude,
  :local_type,
  :longitude,
  :max_eastings,
  :max_northings,
  :min_eastings,
  :min_northings,
  :name_1,
  :name_1_lang,
  :name_2,
  :name_2_lang,
  :northings,
  :outcode,
  :region,
  keyword_init: true
)

# Request payload for Place#load.
#
# @!attribute [rw] id
#   @return [String, nil]
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
# @!attribute [rw] eastings
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
# @!attribute [rw] max_eastings
#   @return [Integer, nil]
#
# @!attribute [rw] max_northings
#   @return [Integer, nil]
#
# @!attribute [rw] min_eastings
#   @return [Integer, nil]
#
# @!attribute [rw] min_northings
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
# @!attribute [rw] northings
#   @return [Integer, nil]
#
# @!attribute [rw] outcode
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
PlaceListMatch = Struct.new(
  :code,
  :country,
  :county_unitary,
  :county_unitary_type,
  :district_borough,
  :district_borough_type,
  :eastings,
  :latitude,
  :local_type,
  :longitude,
  :max_eastings,
  :max_northings,
  :min_eastings,
  :min_northings,
  :name_1,
  :name_1_lang,
  :name_2,
  :name_2_lang,
  :northings,
  :outcode,
  :region,
  keyword_init: true
)

# Postcode entity data model.
#
# @!attribute [rw] admin_county
#   @return [String]
#
# @!attribute [rw] admin_district
#   @return [String]
#
# @!attribute [rw] admin_ward
#   @return [String]
#
# @!attribute [rw] bua
#   @return [String, nil]
#
# @!attribute [rw] cancer_alliance
#   @return [String, nil]
#
# @!attribute [rw] ccg
#   @return [String]
#
# @!attribute [rw] ced
#   @return [String]
#
# @!attribute [rw] codes
#   @return [Hash]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] date_of_introduction
#   @return [String, nil]
#
# @!attribute [rw] eastings
#   @return [Integer]
#
# @!attribute [rw] european_electoral_region
#   @return [String]
#
# @!attribute [rw] icb
#   @return [String, nil]
#
# @!attribute [rw] incode
#   @return [String]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] lep1
#   @return [String, nil]
#
# @!attribute [rw] lep2
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] lsoa
#   @return [String]
#
# @!attribute [rw] lsoa11
#   @return [String, nil]
#
# @!attribute [rw] lsoa21
#   @return [String, nil]
#
# @!attribute [rw] msoa
#   @return [String]
#
# @!attribute [rw] msoa11
#   @return [String, nil]
#
# @!attribute [rw] msoa21
#   @return [String, nil]
#
# @!attribute [rw] national_park
#   @return [String, nil]
#
# @!attribute [rw] nhs_ha
#   @return [String]
#
# @!attribute [rw] nhs_region
#   @return [String, nil]
#
# @!attribute [rw] northings
#   @return [Integer]
#
# @!attribute [rw] nuts
#   @return [String]
#
# @!attribute [rw] oa21
#   @return [String, nil]
#
# @!attribute [rw] outcode
#   @return [String]
#
# @!attribute [rw] parish
#   @return [String]
#
# @!attribute [rw] parliamentary_constituency
#   @return [String]
#
# @!attribute [rw] parliamentary_constituency_2024
#   @return [String, nil]
#
# @!attribute [rw] pfa
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String]
#
# @!attribute [rw] primary_care_trust
#   @return [String]
#
# @!attribute [rw] quality
#   @return [Integer]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] result
#   @return [Array]
#
# @!attribute [rw] ruc11
#   @return [String, nil]
#
# @!attribute [rw] ruc21
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] ttwa
#   @return [String, nil]
Postcode = Struct.new(
  :admin_county,
  :admin_district,
  :admin_ward,
  :bua,
  :cancer_alliance,
  :ccg,
  :ced,
  :codes,
  :country,
  :date_of_introduction,
  :eastings,
  :european_electoral_region,
  :icb,
  :incode,
  :latitude,
  :lep1,
  :lep2,
  :longitude,
  :lsoa,
  :lsoa11,
  :lsoa21,
  :msoa,
  :msoa11,
  :msoa21,
  :national_park,
  :nhs_ha,
  :nhs_region,
  :northings,
  :nuts,
  :oa21,
  :outcode,
  :parish,
  :parliamentary_constituency,
  :parliamentary_constituency_2024,
  :pfa,
  :postcode,
  :primary_care_trust,
  :quality,
  :region,
  :result,
  :ruc11,
  :ruc21,
  :status,
  :ttwa,
  keyword_init: true
)

# Request payload for Postcode#load.
#
# @!attribute [rw] id
#   @return [String, nil]
PostcodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Postcode#list.
#
# @!attribute [rw] admin_county
#   @return [String, nil]
#
# @!attribute [rw] admin_district
#   @return [String, nil]
#
# @!attribute [rw] admin_ward
#   @return [String, nil]
#
# @!attribute [rw] bua
#   @return [String, nil]
#
# @!attribute [rw] cancer_alliance
#   @return [String, nil]
#
# @!attribute [rw] ccg
#   @return [String, nil]
#
# @!attribute [rw] ced
#   @return [String, nil]
#
# @!attribute [rw] codes
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] date_of_introduction
#   @return [String, nil]
#
# @!attribute [rw] eastings
#   @return [Integer, nil]
#
# @!attribute [rw] european_electoral_region
#   @return [String, nil]
#
# @!attribute [rw] icb
#   @return [String, nil]
#
# @!attribute [rw] incode
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] lep1
#   @return [String, nil]
#
# @!attribute [rw] lep2
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] lsoa
#   @return [String, nil]
#
# @!attribute [rw] lsoa11
#   @return [String, nil]
#
# @!attribute [rw] lsoa21
#   @return [String, nil]
#
# @!attribute [rw] msoa
#   @return [String, nil]
#
# @!attribute [rw] msoa11
#   @return [String, nil]
#
# @!attribute [rw] msoa21
#   @return [String, nil]
#
# @!attribute [rw] national_park
#   @return [String, nil]
#
# @!attribute [rw] nhs_ha
#   @return [String, nil]
#
# @!attribute [rw] nhs_region
#   @return [String, nil]
#
# @!attribute [rw] northings
#   @return [Integer, nil]
#
# @!attribute [rw] nuts
#   @return [String, nil]
#
# @!attribute [rw] oa21
#   @return [String, nil]
#
# @!attribute [rw] outcode
#   @return [String, nil]
#
# @!attribute [rw] parish
#   @return [String, nil]
#
# @!attribute [rw] parliamentary_constituency
#   @return [String, nil]
#
# @!attribute [rw] parliamentary_constituency_2024
#   @return [String, nil]
#
# @!attribute [rw] pfa
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String, nil]
#
# @!attribute [rw] primary_care_trust
#   @return [String, nil]
#
# @!attribute [rw] quality
#   @return [Integer, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] ruc11
#   @return [String, nil]
#
# @!attribute [rw] ruc21
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer, nil]
#
# @!attribute [rw] ttwa
#   @return [String, nil]
PostcodeListMatch = Struct.new(
  :admin_county,
  :admin_district,
  :admin_ward,
  :bua,
  :cancer_alliance,
  :ccg,
  :ced,
  :codes,
  :country,
  :date_of_introduction,
  :eastings,
  :european_electoral_region,
  :icb,
  :incode,
  :latitude,
  :lep1,
  :lep2,
  :longitude,
  :lsoa,
  :lsoa11,
  :lsoa21,
  :msoa,
  :msoa11,
  :msoa21,
  :national_park,
  :nhs_ha,
  :nhs_region,
  :northings,
  :nuts,
  :oa21,
  :outcode,
  :parish,
  :parliamentary_constituency,
  :parliamentary_constituency_2024,
  :pfa,
  :postcode,
  :primary_care_trust,
  :quality,
  :region,
  :result,
  :ruc11,
  :ruc21,
  :status,
  :ttwa,
  keyword_init: true
)

# Request payload for Postcode#create.
#
# @!attribute [rw] admin_county
#   @return [String]
#
# @!attribute [rw] admin_district
#   @return [String]
#
# @!attribute [rw] admin_ward
#   @return [String]
#
# @!attribute [rw] bua
#   @return [String, nil]
#
# @!attribute [rw] cancer_alliance
#   @return [String, nil]
#
# @!attribute [rw] ccg
#   @return [String]
#
# @!attribute [rw] ced
#   @return [String]
#
# @!attribute [rw] codes
#   @return [Hash]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] date_of_introduction
#   @return [String, nil]
#
# @!attribute [rw] eastings
#   @return [Integer]
#
# @!attribute [rw] european_electoral_region
#   @return [String]
#
# @!attribute [rw] icb
#   @return [String, nil]
#
# @!attribute [rw] incode
#   @return [String]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] lep1
#   @return [String, nil]
#
# @!attribute [rw] lep2
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] lsoa
#   @return [String]
#
# @!attribute [rw] lsoa11
#   @return [String, nil]
#
# @!attribute [rw] lsoa21
#   @return [String, nil]
#
# @!attribute [rw] msoa
#   @return [String]
#
# @!attribute [rw] msoa11
#   @return [String, nil]
#
# @!attribute [rw] msoa21
#   @return [String, nil]
#
# @!attribute [rw] national_park
#   @return [String, nil]
#
# @!attribute [rw] nhs_ha
#   @return [String]
#
# @!attribute [rw] nhs_region
#   @return [String, nil]
#
# @!attribute [rw] northings
#   @return [Integer]
#
# @!attribute [rw] nuts
#   @return [String]
#
# @!attribute [rw] oa21
#   @return [String, nil]
#
# @!attribute [rw] outcode
#   @return [String]
#
# @!attribute [rw] parish
#   @return [String]
#
# @!attribute [rw] parliamentary_constituency
#   @return [String]
#
# @!attribute [rw] parliamentary_constituency_2024
#   @return [String, nil]
#
# @!attribute [rw] pfa
#   @return [String, nil]
#
# @!attribute [rw] postcode
#   @return [String]
#
# @!attribute [rw] primary_care_trust
#   @return [String]
#
# @!attribute [rw] quality
#   @return [Integer]
#
# @!attribute [rw] region
#   @return [String]
#
# @!attribute [rw] result
#   @return [Array]
#
# @!attribute [rw] ruc11
#   @return [String, nil]
#
# @!attribute [rw] ruc21
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] ttwa
#   @return [String, nil]
PostcodeCreateData = Struct.new(
  :admin_county,
  :admin_district,
  :admin_ward,
  :bua,
  :cancer_alliance,
  :ccg,
  :ced,
  :codes,
  :country,
  :date_of_introduction,
  :eastings,
  :european_electoral_region,
  :icb,
  :incode,
  :latitude,
  :lep1,
  :lep2,
  :longitude,
  :lsoa,
  :lsoa11,
  :lsoa21,
  :msoa,
  :msoa11,
  :msoa21,
  :national_park,
  :nhs_ha,
  :nhs_region,
  :northings,
  :nuts,
  :oa21,
  :outcode,
  :parish,
  :parliamentary_constituency,
  :parliamentary_constituency_2024,
  :pfa,
  :postcode,
  :primary_care_trust,
  :quality,
  :region,
  :result,
  :ruc11,
  :ruc21,
  :status,
  :ttwa,
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

