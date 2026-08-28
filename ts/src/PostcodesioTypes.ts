// Typed models for the Postcodesio SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Nearest {
  result: any[]
  status: number
}

export interface NearestListMatch {
  postcode_id: string
}

export interface Outcode {
  id?: string
}

export interface OutcodeLoadMatch {
  id: string
}

export interface Place {
  code: string
  country: string
  county_unitary: string
  county_unitary_type: string
  district_borough: string
  district_borough_type?: string
  eastings: number
  id?: string
  latitude: number
  local_type: string
  longitude: number
  max_eastings: number
  max_northings: number
  min_eastings: number
  min_northings: number
  name_1: string
  name_1_lang: string
  name_2: string
  name_2_lang: string
  northings: number
  outcode: string
  region: string
}

export interface PlaceLoadMatch {
  id: string
}

export interface PlaceListMatch {
  code?: string
  country?: string
  county_unitary?: string
  county_unitary_type?: string
  district_borough?: string
  district_borough_type?: string
  eastings?: number
  id?: string
  latitude?: number
  local_type?: string
  longitude?: number
  max_eastings?: number
  max_northings?: number
  min_eastings?: number
  min_northings?: number
  name_1?: string
  name_1_lang?: string
  name_2?: string
  name_2_lang?: string
  northings?: number
  outcode?: string
  region?: string
}

export interface Postcode {
  admin_county: string
  admin_district: string
  admin_ward: string
  bua?: string
  cancer_alliance?: string
  ccg: string
  ced: string
  codes: Record<string, any>
  country: string
  date_of_introduction?: string
  eastings: number
  european_electoral_region: string
  icb?: string
  id?: string
  incode: string
  latitude: number
  lep1?: string
  lep2?: string
  longitude: number
  lsoa: string
  lsoa11?: string
  lsoa21?: string
  msoa: string
  msoa11?: string
  msoa21?: string
  national_park?: string
  nhs_ha: string
  nhs_region?: string
  northings: number
  nuts: string
  oa21?: string
  outcode: string
  parish: string
  parliamentary_constituency: string
  parliamentary_constituency_2024?: string
  pfa?: string
  postcode: string
  primary_care_trust: string
  quality: number
  region: string
  result: any[]
  ruc11?: string
  ruc21?: string
  status: number
  ttwa?: string
}

export interface PostcodeLoadMatch {
  id: string
}

export interface PostcodeListMatch {
  filter?: string
  latitude?: number
  limit?: number
  longitude?: number
  query?: any
  radius?: number
  widesearch?: boolean
}

export interface PostcodeCreateData {
  admin_county: string
  admin_district: string
  admin_ward: string
  bua?: string
  cancer_alliance?: string
  ccg: string
  ced: string
  codes: Record<string, any>
  country: string
  date_of_introduction?: string
  eastings: number
  european_electoral_region: string
  icb?: string
  id?: string
  incode: string
  latitude: number
  lep1?: string
  lep2?: string
  longitude: number
  lsoa: string
  lsoa11?: string
  lsoa21?: string
  msoa: string
  msoa11?: string
  msoa21?: string
  national_park?: string
  nhs_ha: string
  nhs_region?: string
  northings: number
  nuts: string
  oa21?: string
  outcode: string
  parish: string
  parliamentary_constituency: string
  parliamentary_constituency_2024?: string
  pfa?: string
  postcode: string
  primary_care_trust: string
  quality: number
  region: string
  result: any[]
  ruc11?: string
  ruc21?: string
  status: number
  ttwa?: string
}

export interface ScottishPostcode {
  id?: string
  result: any[]
  status: number
}

export interface ScottishPostcodeLoadMatch {
  id: string
}

export interface TerminatedPostcode {
  id?: string
  result: any[]
  status: number
}

export interface TerminatedPostcodeLoadMatch {
  id: string
}

