# Postcodesio SDK utility: make_context

from postcodesio_sdk.core.context import PostcodesioContext


def make_context_util(ctxmap, basectx):
    return PostcodesioContext(ctxmap, basectx)
