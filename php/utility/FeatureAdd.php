<?php
declare(strict_types=1);

// Postcodesio SDK utility: feature_add

class PostcodesioFeatureAdd
{
    public static function call(PostcodesioContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
