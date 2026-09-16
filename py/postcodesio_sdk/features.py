# Postcodesio SDK feature factory

from postcodesio_sdk.feature.base_feature import PostcodesioBaseFeature
from postcodesio_sdk.feature.ratelimit_feature import PostcodesioRatelimitFeature
from postcodesio_sdk.feature.retry_feature import PostcodesioRetryFeature
from postcodesio_sdk.feature.test_feature import PostcodesioTestFeature
from postcodesio_sdk.feature.timeout_feature import PostcodesioTimeoutFeature


_FEATURES = {
    "base": lambda: PostcodesioBaseFeature(),
    "ratelimit": lambda: PostcodesioRatelimitFeature(),
    "retry": lambda: PostcodesioRetryFeature(),
    "test": lambda: PostcodesioTestFeature(),
    "timeout": lambda: PostcodesioTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
