# Postcodesio SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import PostcodesioUtility
from core.spec import PostcodesioSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import PostcodesioBaseFeature
from features import _make_feature


class PostcodesioSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = PostcodesioUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return PostcodesioUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = PostcodesioSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def nearest(self):
        """Idiomatic facade: client.nearest.list() / client.nearest.load({"id": ...})."""
        from entity.nearest_entity import NearestEntity
        cached = getattr(self, "_nearest", None)
        if cached is None:
            cached = NearestEntity(self, None)
            self._nearest = cached
        return cached

    def Nearest(self, data=None):
        # Deprecated: use client.nearest instead.
        from entity.nearest_entity import NearestEntity
        return NearestEntity(self, data)


    @property
    def outcode(self):
        """Idiomatic facade: client.outcode.list() / client.outcode.load({"id": ...})."""
        from entity.outcode_entity import OutcodeEntity
        cached = getattr(self, "_outcode", None)
        if cached is None:
            cached = OutcodeEntity(self, None)
            self._outcode = cached
        return cached

    def Outcode(self, data=None):
        # Deprecated: use client.outcode instead.
        from entity.outcode_entity import OutcodeEntity
        return OutcodeEntity(self, data)


    @property
    def place(self):
        """Idiomatic facade: client.place.list() / client.place.load({"id": ...})."""
        from entity.place_entity import PlaceEntity
        cached = getattr(self, "_place", None)
        if cached is None:
            cached = PlaceEntity(self, None)
            self._place = cached
        return cached

    def Place(self, data=None):
        # Deprecated: use client.place instead.
        from entity.place_entity import PlaceEntity
        return PlaceEntity(self, data)


    @property
    def postcode(self):
        """Idiomatic facade: client.postcode.list() / client.postcode.load({"id": ...})."""
        from entity.postcode_entity import PostcodeEntity
        cached = getattr(self, "_postcode", None)
        if cached is None:
            cached = PostcodeEntity(self, None)
            self._postcode = cached
        return cached

    def Postcode(self, data=None):
        # Deprecated: use client.postcode instead.
        from entity.postcode_entity import PostcodeEntity
        return PostcodeEntity(self, data)


    @property
    def scottish_postcode(self):
        """Idiomatic facade: client.scottish_postcode.list() / client.scottish_postcode.load({"id": ...})."""
        from entity.scottish_postcode_entity import ScottishPostcodeEntity
        cached = getattr(self, "_scottish_postcode", None)
        if cached is None:
            cached = ScottishPostcodeEntity(self, None)
            self._scottish_postcode = cached
        return cached

    def ScottishPostcode(self, data=None):
        # Deprecated: use client.scottish_postcode instead.
        from entity.scottish_postcode_entity import ScottishPostcodeEntity
        return ScottishPostcodeEntity(self, data)


    @property
    def terminated_postcode(self):
        """Idiomatic facade: client.terminated_postcode.list() / client.terminated_postcode.load({"id": ...})."""
        from entity.terminated_postcode_entity import TerminatedPostcodeEntity
        cached = getattr(self, "_terminated_postcode", None)
        if cached is None:
            cached = TerminatedPostcodeEntity(self, None)
            self._terminated_postcode = cached
        return cached

    def TerminatedPostcode(self, data=None):
        # Deprecated: use client.terminated_postcode instead.
        from entity.terminated_postcode_entity import TerminatedPostcodeEntity
        return TerminatedPostcodeEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
