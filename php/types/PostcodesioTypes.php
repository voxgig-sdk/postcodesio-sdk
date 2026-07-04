<?php
declare(strict_types=1);

// Typed models for the Postcodesio SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Nearest entity data model. */
class Nearest
{
    public array $result;
    public int $status;
}

/** Request payload for Nearest#list. */
class NearestListMatch
{
    public string $postcode_id;
}

/** Outcode entity data model. */
class Outcode
{
    public mixed $result;
    public int $status;
}

/** Request payload for Outcode#load. */
class OutcodeLoadMatch
{
    public string $id;
}

/** Place entity data model. */
class Place
{
    public string $code;
    public string $country;
    public string $county_unitary;
    public string $county_unitary_type;
    public string $district_borough;
    public ?string $district_borough_type = null;
    public int $easting;
    public float $latitude;
    public string $local_type;
    public float $longitude;
    public int $max_easting;
    public int $max_northing;
    public int $min_easting;
    public int $min_northing;
    public string $name_1;
    public string $name_1_lang;
    public string $name_2;
    public string $name_2_lang;
    public int $northing;
    public string $outcode;
    public string $region;
    public array $result;
    public int $status;
}

/** Request payload for Place#load. */
class PlaceLoadMatch
{
    public string $id;
}

/** Match filter for Place#list (any subset of Place fields). */
class PlaceListMatch
{
    public ?string $code = null;
    public ?string $country = null;
    public ?string $county_unitary = null;
    public ?string $county_unitary_type = null;
    public ?string $district_borough = null;
    public ?string $district_borough_type = null;
    public ?int $easting = null;
    public ?float $latitude = null;
    public ?string $local_type = null;
    public ?float $longitude = null;
    public ?int $max_easting = null;
    public ?int $max_northing = null;
    public ?int $min_easting = null;
    public ?int $min_northing = null;
    public ?string $name_1 = null;
    public ?string $name_1_lang = null;
    public ?string $name_2 = null;
    public ?string $name_2_lang = null;
    public ?int $northing = null;
    public ?string $outcode = null;
    public ?string $region = null;
    public ?array $result = null;
    public ?int $status = null;
}

/** Postcode entity data model. */
class Postcode
{
    public array $result;
    public int $status;
}

/** Request payload for Postcode#load. */
class PostcodeLoadMatch
{
    public string $id;
}

/** Match filter for Postcode#list (any subset of Postcode fields). */
class PostcodeListMatch
{
    public ?array $result = null;
    public ?int $status = null;
}

/** Match filter for Postcode#create (any subset of Postcode fields). */
class PostcodeCreateData
{
    public ?array $result = null;
    public ?int $status = null;
}

/** ScottishPostcode entity data model. */
class ScottishPostcode
{
    public array $result;
    public int $status;
}

/** Request payload for ScottishPostcode#load. */
class ScottishPostcodeLoadMatch
{
    public string $id;
}

/** TerminatedPostcode entity data model. */
class TerminatedPostcode
{
    public array $result;
    public int $status;
}

/** Request payload for TerminatedPostcode#load. */
class TerminatedPostcodeLoadMatch
{
    public string $id;
}

