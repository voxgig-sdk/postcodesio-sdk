<?php
declare(strict_types=1);

// Postcodesio SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PostcodesioUtility::setRegistrar(function (PostcodesioUtility $u): void {
    $u->clean = [PostcodesioClean::class, 'call'];
    $u->done = [PostcodesioDone::class, 'call'];
    $u->make_error = [PostcodesioMakeError::class, 'call'];
    $u->feature_add = [PostcodesioFeatureAdd::class, 'call'];
    $u->feature_hook = [PostcodesioFeatureHook::class, 'call'];
    $u->feature_init = [PostcodesioFeatureInit::class, 'call'];
    $u->fetcher = [PostcodesioFetcher::class, 'call'];
    $u->make_fetch_def = [PostcodesioMakeFetchDef::class, 'call'];
    $u->make_context = [PostcodesioMakeContext::class, 'call'];
    $u->make_options = [PostcodesioMakeOptions::class, 'call'];
    $u->make_request = [PostcodesioMakeRequest::class, 'call'];
    $u->make_response = [PostcodesioMakeResponse::class, 'call'];
    $u->make_result = [PostcodesioMakeResult::class, 'call'];
    $u->make_point = [PostcodesioMakePoint::class, 'call'];
    $u->make_spec = [PostcodesioMakeSpec::class, 'call'];
    $u->make_url = [PostcodesioMakeUrl::class, 'call'];
    $u->param = [PostcodesioParam::class, 'call'];
    $u->prepare_auth = [PostcodesioPrepareAuth::class, 'call'];
    $u->prepare_body = [PostcodesioPrepareBody::class, 'call'];
    $u->prepare_headers = [PostcodesioPrepareHeaders::class, 'call'];
    $u->prepare_method = [PostcodesioPrepareMethod::class, 'call'];
    $u->prepare_params = [PostcodesioPrepareParams::class, 'call'];
    $u->prepare_path = [PostcodesioPreparePath::class, 'call'];
    $u->prepare_query = [PostcodesioPrepareQuery::class, 'call'];
    $u->result_basic = [PostcodesioResultBasic::class, 'call'];
    $u->result_body = [PostcodesioResultBody::class, 'call'];
    $u->result_headers = [PostcodesioResultHeaders::class, 'call'];
    $u->transform_request = [PostcodesioTransformRequest::class, 'call'];
    $u->transform_response = [PostcodesioTransformResponse::class, 'call'];
});
