# Postcodesio SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PostcodesioFeatures
  def self.make_feature(name)
    case name
    when "base"
      PostcodesioBaseFeature.new
    when "ratelimit"
      PostcodesioRatelimitFeature.new
    when "retry"
      PostcodesioRetryFeature.new
    when "test"
      PostcodesioTestFeature.new
    when "timeout"
      PostcodesioTimeoutFeature.new
    else
      PostcodesioBaseFeature.new
    end
  end
end
