<?php
declare(strict_types=1);

// Postcodesio SDK exists test

require_once __DIR__ . '/../postcodesio_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PostcodesioSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
