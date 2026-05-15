# Postcodesio SDK utility: feature_add
module PostcodesioUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
