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
  result: any
  status: number
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
  easting: number
  latitude: number
  local_type: string
  longitude: number
  max_easting: number
  max_northing: number
  min_easting: number
  min_northing: number
  name_1: string
  name_1_lang: string
  name_2: string
  name_2_lang: string
  northing: number
  outcode: string
  region: string
  result: Record<string, any>
  status: number
}

export interface PlaceLoadMatch {
  id?: string
}

export interface PlaceListMatch {
  code?: string
  country?: string
  county_unitary?: string
  county_unitary_type?: string
  district_borough?: string
  district_borough_type?: string
  easting?: number
  latitude?: number
  local_type?: string
  longitude?: number
  max_easting?: number
  max_northing?: number
  min_easting?: number
  min_northing?: number
  name_1?: string
  name_1_lang?: string
  name_2?: string
  name_2_lang?: string
  northing?: number
  outcode?: string
  region?: string
  result?: Record<string, any>
  status?: number
}

export interface Postcode {
  result: Record<string, any>
  status: number
}

export interface PostcodeLoadMatch {
  id?: string
}

export interface PostcodeListMatch {
  result?: Record<string, any>
  status?: number
}

export interface PostcodeCreateData {
  result: Record<string, any>
  status: number
}

export interface ScottishPostcode {
  result: any[]
  status: number
}

export interface ScottishPostcodeLoadMatch {
  id: string
}

export interface TerminatedPostcode {
  result: any[]
  status: number
}

export interface TerminatedPostcodeLoadMatch {
  id: string
}

