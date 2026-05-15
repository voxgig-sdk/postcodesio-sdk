<?php
declare(strict_types=1);

// Postcodesio SDK configuration

class PostcodesioConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Postcodesio",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.postcodes.io",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "nearest" => [],
                    "outcode" => [],
                    "place" => [],
                    "postcode" => [],
                    "scottish_postcode" => [],
                    "terminated_postcode" => [],
                ],
            ],
            "entity" => [
        'nearest' => [
          'fields' => [
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'nearest',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'SW1A 2AA',
                        'kind' => 'param',
                        'name' => 'postcode_id',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/postcodes/{postcode}/nearest',
                  'parts' => [
                    'postcodes',
                    '{postcode_id}',
                    'nearest',
                  ],
                  'rename' => [
                    'param' => [
                      'postcode' => 'postcode_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'postcode_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'postcode',
              ],
            ],
          ],
        ],
        'outcode' => [
          'fields' => [
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$ANY`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'outcode',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'SW1A',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'outcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/outcodes/{outcode}',
                  'parts' => [
                    'outcodes',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'outcode' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'place' => [
          'fields' => [
            [
              'name' => 'code',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'country',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'county_unitary',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'county_unitary_type',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'district_borough',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'district_borough_type',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'easting',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'latitude',
              'req' => true,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 7,
            ],
            [
              'name' => 'local_type',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 8,
            ],
            [
              'name' => 'longitude',
              'req' => true,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 9,
            ],
            [
              'name' => 'max_easting',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 10,
            ],
            [
              'name' => 'max_northing',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 11,
            ],
            [
              'name' => 'min_easting',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 12,
            ],
            [
              'name' => 'min_northing',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 13,
            ],
            [
              'name' => 'name_1',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 14,
            ],
            [
              'name' => 'name_1_lang',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 15,
            ],
            [
              'name' => 'name_2',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 16,
            ],
            [
              'name' => 'name_2_lang',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 17,
            ],
            [
              'name' => 'northing',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 18,
            ],
            [
              'name' => 'outcode',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 19,
            ],
            [
              'name' => 'region',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 20,
            ],
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 21,
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 22,
            ],
          ],
          'name' => 'place',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/places',
                  'parts' => [
                    'places',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'code',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/places/{code}',
                  'parts' => [
                    'places',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'code' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'method' => 'GET',
                  'orig' => '/random/places',
                  'parts' => [
                    'random',
                    'places',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'postcode' => [
          'fields' => [
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'postcode',
          'op' => [
            'create' => [
              'name' => 'create',
              'points' => [
                [
                  'method' => 'POST',
                  'orig' => '/postcodes',
                  'parts' => [
                    'postcodes',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'create',
            ],
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'postcode',
                        'kind' => 'query',
                        'name' => 'filter',
                        'orig' => 'filter',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 51.50354,
                        'kind' => 'query',
                        'name' => 'latitude',
                        'orig' => 'latitude',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'example' => 3,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => -0.127695,
                        'kind' => 'query',
                        'name' => 'longitude',
                        'orig' => 'longitude',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'SW1A 2AA',
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'reqd' => false,
                        'type' => '`$ANY`',
                        'active' => true,
                      ],
                      [
                        'example' => 500,
                        'kind' => 'query',
                        'name' => 'radius',
                        'orig' => 'radius',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'true',
                        'kind' => 'query',
                        'name' => 'widesearch',
                        'orig' => 'widesearch',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/postcodes',
                  'parts' => [
                    'postcodes',
                  ],
                  'select' => [
                    'exist' => [
                      'filter',
                      'latitude',
                      'limit',
                      'longitude',
                      'query',
                      'radius',
                      'widesearch',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'SW1A 2AA',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/postcodes/{postcode}',
                  'parts' => [
                    'postcodes',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'postcode' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'SW1A',
                        'kind' => 'query',
                        'name' => 'outcode',
                        'orig' => 'outcode',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/random/postcodes',
                  'parts' => [
                    'random',
                    'postcodes',
                  ],
                  'select' => [
                    'exist' => [
                      'outcode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'scottish_postcode' => [
          'fields' => [
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'scottish_postcode',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/scotland/postcodes/{postcode}',
                  'parts' => [
                    'scotland',
                    'postcodes',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'postcode' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'terminated_postcode' => [
          'fields' => [
            [
              'name' => 'result',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'status',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'terminated_postcode',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'postcode',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/terminated_postcodes/{postcode}',
                  'parts' => [
                    'terminated_postcodes',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'postcode' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PostcodesioFeatures::make_feature($name);
    }
}
