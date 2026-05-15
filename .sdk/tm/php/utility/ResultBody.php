<?php
declare(strict_types=1);

// Postcodesio SDK utility: result_body

class PostcodesioResultBody
{
    public static function call(PostcodesioContext $ctx): ?PostcodesioResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
