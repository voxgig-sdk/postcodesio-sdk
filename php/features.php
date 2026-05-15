<?php
declare(strict_types=1);

// Postcodesio SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PostcodesioFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PostcodesioBaseFeature();
            case "test":
                return new PostcodesioTestFeature();
            default:
                return new PostcodesioBaseFeature();
        }
    }
}
