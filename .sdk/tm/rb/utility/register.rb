# Postcodesio SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PostcodesioUtility.registrar = ->(u) {
  u.clean = PostcodesioUtilities::Clean
  u.done = PostcodesioUtilities::Done
  u.make_error = PostcodesioUtilities::MakeError
  u.feature_add = PostcodesioUtilities::FeatureAdd
  u.feature_hook = PostcodesioUtilities::FeatureHook
  u.feature_init = PostcodesioUtilities::FeatureInit
  u.fetcher = PostcodesioUtilities::Fetcher
  u.make_fetch_def = PostcodesioUtilities::MakeFetchDef
  u.make_context = PostcodesioUtilities::MakeContext
  u.make_options = PostcodesioUtilities::MakeOptions
  u.make_request = PostcodesioUtilities::MakeRequest
  u.make_response = PostcodesioUtilities::MakeResponse
  u.make_result = PostcodesioUtilities::MakeResult
  u.make_point = PostcodesioUtilities::MakePoint
  u.make_spec = PostcodesioUtilities::MakeSpec
  u.make_url = PostcodesioUtilities::MakeUrl
  u.param = PostcodesioUtilities::Param
  u.prepare_auth = PostcodesioUtilities::PrepareAuth
  u.prepare_body = PostcodesioUtilities::PrepareBody
  u.prepare_headers = PostcodesioUtilities::PrepareHeaders
  u.prepare_method = PostcodesioUtilities::PrepareMethod
  u.prepare_params = PostcodesioUtilities::PrepareParams
  u.prepare_path = PostcodesioUtilities::PreparePath
  u.prepare_query = PostcodesioUtilities::PrepareQuery
  u.result_basic = PostcodesioUtilities::ResultBasic
  u.result_body = PostcodesioUtilities::ResultBody
  u.result_headers = PostcodesioUtilities::ResultHeaders
  u.transform_request = PostcodesioUtilities::TransformRequest
  u.transform_response = PostcodesioUtilities::TransformResponse
}
