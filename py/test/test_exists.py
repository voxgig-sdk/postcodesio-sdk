# Postcodesio SDK exists test

import pytest
from postcodesio_sdk import PostcodesioSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PostcodesioSDK.test(None, None)
        assert testsdk is not None
