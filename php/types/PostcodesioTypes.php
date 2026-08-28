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
    public ?string $id = null;
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
    public int $eastings;
    public ?string $id = null;
    public float $latitude;
    public string $local_type;
    public float $longitude;
    public int $max_eastings;
    public int $max_northings;
    public int $min_eastings;
    public int $min_northings;
    public string $name_1;
    public string $name_1_lang;
    public string $name_2;
    public string $name_2_lang;
    public int $northings;
    public string $outcode;
    public string $region;
}

/** Request payload for Place#load. */
class PlaceLoadMatch
{
    public string $id;
}

/** Request payload for Place#list. */
class PlaceListMatch
{
    public ?string $code = null;
    public ?string $country = null;
    public ?string $county_unitary = null;
    public ?string $county_unitary_type = null;
    public ?string $district_borough = null;
    public ?string $district_borough_type = null;
    public ?int $eastings = null;
    public ?string $id = null;
    public ?float $latitude = null;
    public ?string $local_type = null;
    public ?float $longitude = null;
    public ?int $max_eastings = null;
    public ?int $max_northings = null;
    public ?int $min_eastings = null;
    public ?int $min_northings = null;
    public ?string $name_1 = null;
    public ?string $name_1_lang = null;
    public ?string $name_2 = null;
    public ?string $name_2_lang = null;
    public ?int $northings = null;
    public ?string $outcode = null;
    public ?string $region = null;
}

/** Postcode entity data model. */
class Postcode
{
    public string $admin_county;
    public string $admin_district;
    public string $admin_ward;
    public ?string $bua = null;
    public ?string $cancer_alliance = null;
    public string $ccg;
    public string $ced;
    public array $codes;
    public string $country;
    public ?string $date_of_introduction = null;
    public int $eastings;
    public string $european_electoral_region;
    public ?string $icb = null;
    public ?string $id = null;
    public string $incode;
    public float $latitude;
    public ?string $lep1 = null;
    public ?string $lep2 = null;
    public float $longitude;
    public string $lsoa;
    public ?string $lsoa11 = null;
    public ?string $lsoa21 = null;
    public string $msoa;
    public ?string $msoa11 = null;
    public ?string $msoa21 = null;
    public ?string $national_park = null;
    public string $nhs_ha;
    public ?string $nhs_region = null;
    public int $northings;
    public string $nuts;
    public ?string $oa21 = null;
    public string $outcode;
    public string $parish;
    public string $parliamentary_constituency;
    public ?string $parliamentary_constituency_2024 = null;
    public ?string $pfa = null;
    public string $postcode;
    public string $primary_care_trust;
    public int $quality;
    public string $region;
    public array $result;
    public ?string $ruc11 = null;
    public ?string $ruc21 = null;
    public int $status;
    public ?string $ttwa = null;
}

/** Request payload for Postcode#load. */
class PostcodeLoadMatch
{
    public string $id;
}

/** Request payload for Postcode#list. */
class PostcodeListMatch
{
    public ?string $filter = null;
    public ?float $latitude = null;
    public ?int $limit = null;
    public ?float $longitude = null;
    public mixed $query = null;
    public ?int $radius = null;
    public ?bool $widesearch = null;
}

/** Request payload for Postcode#create. */
class PostcodeCreateData
{
    public string $admin_county;
    public string $admin_district;
    public string $admin_ward;
    public ?string $bua = null;
    public ?string $cancer_alliance = null;
    public string $ccg;
    public string $ced;
    public array $codes;
    public string $country;
    public ?string $date_of_introduction = null;
    public int $eastings;
    public string $european_electoral_region;
    public ?string $icb = null;
    public ?string $id = null;
    public string $incode;
    public float $latitude;
    public ?string $lep1 = null;
    public ?string $lep2 = null;
    public float $longitude;
    public string $lsoa;
    public ?string $lsoa11 = null;
    public ?string $lsoa21 = null;
    public string $msoa;
    public ?string $msoa11 = null;
    public ?string $msoa21 = null;
    public ?string $national_park = null;
    public string $nhs_ha;
    public ?string $nhs_region = null;
    public int $northings;
    public string $nuts;
    public ?string $oa21 = null;
    public string $outcode;
    public string $parish;
    public string $parliamentary_constituency;
    public ?string $parliamentary_constituency_2024 = null;
    public ?string $pfa = null;
    public string $postcode;
    public string $primary_care_trust;
    public int $quality;
    public string $region;
    public array $result;
    public ?string $ruc11 = null;
    public ?string $ruc21 = null;
    public int $status;
    public ?string $ttwa = null;
}

/** ScottishPostcode entity data model. */
class ScottishPostcode
{
    public ?string $id = null;
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
    public ?string $id = null;
    public array $result;
    public int $status;
}

/** Request payload for TerminatedPostcode#load. */
class TerminatedPostcodeLoadMatch
{
    public string $id;
}

