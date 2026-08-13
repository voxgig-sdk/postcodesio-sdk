# Typed models for the Postcodesio SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Nearest(TypedDict):
    result: list
    status: int


class NearestListMatch(TypedDict):
    postcode_id: str


class Outcode(TypedDict):
    pass


class OutcodeLoadMatch(TypedDict):
    id: str


class PlaceRequired(TypedDict):
    code: str
    country: str
    county_unitary: str
    county_unitary_type: str
    district_borough: str
    eastings: int
    latitude: float
    local_type: str
    longitude: float
    max_eastings: int
    max_northings: int
    min_eastings: int
    min_northings: int
    name_1: str
    name_1_lang: str
    name_2: str
    name_2_lang: str
    northings: int
    outcode: str
    region: str


class Place(PlaceRequired, total=False):
    district_borough_type: str


class PlaceLoadMatch(TypedDict, total=False):
    id: str


class PlaceListMatch(TypedDict, total=False):
    code: str
    country: str
    county_unitary: str
    county_unitary_type: str
    district_borough: str
    district_borough_type: str
    eastings: int
    latitude: float
    local_type: str
    longitude: float
    max_eastings: int
    max_northings: int
    min_eastings: int
    min_northings: int
    name_1: str
    name_1_lang: str
    name_2: str
    name_2_lang: str
    northings: int
    outcode: str
    region: str


class PostcodeRequired(TypedDict):
    admin_county: str
    admin_district: str
    admin_ward: str
    ccg: str
    ced: str
    codes: dict
    country: str
    eastings: int
    european_electoral_region: str
    incode: str
    latitude: float
    longitude: float
    lsoa: str
    msoa: str
    nhs_ha: str
    northings: int
    nuts: str
    outcode: str
    parish: str
    parliamentary_constituency: str
    postcode: str
    primary_care_trust: str
    quality: int
    region: str
    result: list
    status: int


class Postcode(PostcodeRequired, total=False):
    bua: str
    cancer_alliance: str
    date_of_introduction: str
    icb: str
    lep1: str
    lep2: str
    lsoa11: str
    lsoa21: str
    msoa11: str
    msoa21: str
    national_park: str
    nhs_region: str
    oa21: str
    parliamentary_constituency_2024: str
    pfa: str
    ruc11: str
    ruc21: str
    ttwa: str


class PostcodeLoadMatch(TypedDict, total=False):
    id: str


class PostcodeListMatch(TypedDict, total=False):
    admin_county: str
    admin_district: str
    admin_ward: str
    bua: str
    cancer_alliance: str
    ccg: str
    ced: str
    codes: dict
    country: str
    date_of_introduction: str
    eastings: int
    european_electoral_region: str
    icb: str
    incode: str
    latitude: float
    lep1: str
    lep2: str
    longitude: float
    lsoa: str
    lsoa11: str
    lsoa21: str
    msoa: str
    msoa11: str
    msoa21: str
    national_park: str
    nhs_ha: str
    nhs_region: str
    northings: int
    nuts: str
    oa21: str
    outcode: str
    parish: str
    parliamentary_constituency: str
    parliamentary_constituency_2024: str
    pfa: str
    postcode: str
    primary_care_trust: str
    quality: int
    region: str
    result: list
    ruc11: str
    ruc21: str
    status: int
    ttwa: str


class PostcodeCreateDataRequired(TypedDict):
    admin_county: str
    admin_district: str
    admin_ward: str
    ccg: str
    ced: str
    codes: dict
    country: str
    eastings: int
    european_electoral_region: str
    incode: str
    latitude: float
    longitude: float
    lsoa: str
    msoa: str
    nhs_ha: str
    northings: int
    nuts: str
    outcode: str
    parish: str
    parliamentary_constituency: str
    postcode: str
    primary_care_trust: str
    quality: int
    region: str
    result: list
    status: int


class PostcodeCreateData(PostcodeCreateDataRequired, total=False):
    bua: str
    cancer_alliance: str
    date_of_introduction: str
    icb: str
    lep1: str
    lep2: str
    lsoa11: str
    lsoa21: str
    msoa11: str
    msoa21: str
    national_park: str
    nhs_region: str
    oa21: str
    parliamentary_constituency_2024: str
    pfa: str
    ruc11: str
    ruc21: str
    ttwa: str


class ScottishPostcode(TypedDict):
    result: list
    status: int


class ScottishPostcodeLoadMatch(TypedDict):
    id: str


class TerminatedPostcode(TypedDict):
    result: list
    status: int


class TerminatedPostcodeLoadMatch(TypedDict):
    id: str
