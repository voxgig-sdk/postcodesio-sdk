# Postcodesio SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PostcodesioFeatures
  def self.make_feature(name)
    case name
    when "base"
      PostcodesioBaseFeature.new
    when "test"
      PostcodesioTestFeature.new
    else
      PostcodesioBaseFeature.new
    end
  end
end
