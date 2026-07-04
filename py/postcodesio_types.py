# Typed models for the Postcodesio SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Nearest:
    result: list
    status: int


@dataclass
class NearestListMatch:
    postcode_id: str


@dataclass
class Outcode:
    result: Any
    status: int


@dataclass
class OutcodeLoadMatch:
    id: str


@dataclass
class Place:
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
    district_borough_type: Optional[str] = None


@dataclass
class PlaceLoadMatch:
    id: str


@dataclass
class PlaceListMatch:
    code: Optional[str] = None
    country: Optional[str] = None
    county_unitary: Optional[str] = None
    county_unitary_type: Optional[str] = None
    district_borough: Optional[str] = None
    district_borough_type: Optional[str] = None
    easting: Optional[int] = None
    latitude: Optional[float] = None
    local_type: Optional[str] = None
    longitude: Optional[float] = None
    max_easting: Optional[int] = None
    max_northing: Optional[int] = None
    min_easting: Optional[int] = None
    min_northing: Optional[int] = None
    name_1: Optional[str] = None
    name_1_lang: Optional[str] = None
    name_2: Optional[str] = None
    name_2_lang: Optional[str] = None
    northing: Optional[int] = None
    outcode: Optional[str] = None
    region: Optional[str] = None
    result: Optional[dict] = None
    status: Optional[int] = None


@dataclass
class Postcode:
    result: dict
    status: int


@dataclass
class PostcodeLoadMatch:
    id: str


@dataclass
class PostcodeListMatch:
    result: Optional[dict] = None
    status: Optional[int] = None


@dataclass
class PostcodeCreateData:
    result: Optional[dict] = None
    status: Optional[int] = None


@dataclass
class ScottishPostcode:
    result: list
    status: int


@dataclass
class ScottishPostcodeLoadMatch:
    id: str


@dataclass
class TerminatedPostcode:
    result: list
    status: int


@dataclass
class TerminatedPostcodeLoadMatch:
    id: str

