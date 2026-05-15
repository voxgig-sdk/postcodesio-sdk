# Postcodesio SDK exists test

require "minitest/autorun"
require_relative "../Postcodesio_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PostcodesioSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
