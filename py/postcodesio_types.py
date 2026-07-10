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
    result: Any
    status: int


class OutcodeLoadMatch(TypedDict):
    id: str


class PlaceRequired(TypedDict):
    code: str
    country: str
    county_unitary: str
    county_unitary_type: str
    district_borough: str
    easting: int
    latitude: float
    local_type: str
    longitude: float
    max_easting: int
    max_northing: int
    min_easting: int
    min_northing: int
    name_1: str
    name_1_lang: str
    name_2: str
    name_2_lang: str
    northing: int
    outcode: str
    region: str
    result: dict
    status: int


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
    easting: int
    latitude: float
    local_type: str
    longitude: float
    max_easting: int
    max_northing: int
    min_easting: int
    min_northing: int
    name_1: str
    name_1_lang: str
    name_2: str
    name_2_lang: str
    northing: int
    outcode: str
    region: str
    result: dict
    status: int


class Postcode(TypedDict):
    result: dict
    status: int


class PostcodeLoadMatch(TypedDict, total=False):
    id: str


class PostcodeListMatch(TypedDict, total=False):
    result: dict
    status: int


class PostcodeCreateData(TypedDict):
    result: dict
    status: int


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
