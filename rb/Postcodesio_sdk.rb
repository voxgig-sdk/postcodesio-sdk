# Postcodesio SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Postcodesio_types'


class PostcodesioSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = PostcodesioUtility.new
    @_utility = utility

    config = PostcodesioConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = PostcodesioHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = PostcodesioHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, PostcodesioFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    PostcodesioUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = PostcodesioHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = PostcodesioHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = PostcodesioHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = PostcodesioSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue PostcodesioError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = PostcodesioHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = PostcodesioHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.nearest.list / client.nearest.load({ "id" => ... })
  def nearest
    require_relative 'entity/nearest_entity'
    @nearest ||= NearestEntity.new(self, nil)
  end

  # Deprecated: use client.nearest instead.
  def Nearest(data = nil)
    require_relative 'entity/nearest_entity'
    NearestEntity.new(self, data)
  end


  # Idiomatic facade: client.outcode.list / client.outcode.load({ "id" => ... })
  def outcode
    require_relative 'entity/outcode_entity'
    @outcode ||= OutcodeEntity.new(self, nil)
  end

  # Deprecated: use client.outcode instead.
  def Outcode(data = nil)
    require_relative 'entity/outcode_entity'
    OutcodeEntity.new(self, data)
  end


  # Idiomatic facade: client.place.list / client.place.load({ "id" => ... })
  def place
    require_relative 'entity/place_entity'
    @place ||= PlaceEntity.new(self, nil)
  end

  # Deprecated: use client.place instead.
  def Place(data = nil)
    require_relative 'entity/place_entity'
    PlaceEntity.new(self, data)
  end


  # Idiomatic facade: client.postcode.list / client.postcode.load({ "id" => ... })
  def postcode
    require_relative 'entity/postcode_entity'
    @postcode ||= PostcodeEntity.new(self, nil)
  end

  # Deprecated: use client.postcode instead.
  def Postcode(data = nil)
    require_relative 'entity/postcode_entity'
    PostcodeEntity.new(self, data)
  end


  # Idiomatic facade: client.scottish_postcode.list / client.scottish_postcode.load({ "id" => ... })
  def scottish_postcode
    require_relative 'entity/scottish_postcode_entity'
    @scottish_postcode ||= ScottishPostcodeEntity.new(self, nil)
  end

  # Deprecated: use client.scottish_postcode instead.
  def ScottishPostcode(data = nil)
    require_relative 'entity/scottish_postcode_entity'
    ScottishPostcodeEntity.new(self, data)
  end


  # Idiomatic facade: client.terminated_postcode.list / client.terminated_postcode.load({ "id" => ... })
  def terminated_postcode
    require_relative 'entity/terminated_postcode_entity'
    @terminated_postcode ||= TerminatedPostcodeEntity.new(self, nil)
  end

  # Deprecated: use client.terminated_postcode instead.
  def TerminatedPostcode(data = nil)
    require_relative 'entity/terminated_postcode_entity'
    TerminatedPostcodeEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = PostcodesioSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
