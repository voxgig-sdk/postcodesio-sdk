<?php
declare(strict_types=1);

// Postcodesio SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PostcodesioMakeContext
{
    public static function call(array $ctxmap, ?PostcodesioContext $basectx): PostcodesioContext
    {
        return new PostcodesioContext($ctxmap, $basectx);
    }
}
