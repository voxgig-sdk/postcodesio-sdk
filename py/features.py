# Postcodesio SDK feature factory

from feature.base_feature import PostcodesioBaseFeature
from feature.test_feature import PostcodesioTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PostcodesioBaseFeature(),
        "test": lambda: PostcodesioTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
