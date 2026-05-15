<?php
declare(strict_types=1);

// Postcodesio SDK utility: result_headers

class PostcodesioResultHeaders
{
    public static function call(PostcodesioContext $ctx): ?PostcodesioResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
