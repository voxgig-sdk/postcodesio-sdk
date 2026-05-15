<?php
declare(strict_types=1);

// Postcodesio SDK base feature

class PostcodesioBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PostcodesioContext $ctx, array $options): void {}
    public function PostConstruct(PostcodesioContext $ctx): void {}
    public function PostConstructEntity(PostcodesioContext $ctx): void {}
    public function SetData(PostcodesioContext $ctx): void {}
    public function GetData(PostcodesioContext $ctx): void {}
    public function GetMatch(PostcodesioContext $ctx): void {}
    public function SetMatch(PostcodesioContext $ctx): void {}
    public function PrePoint(PostcodesioContext $ctx): void {}
    public function PreSpec(PostcodesioContext $ctx): void {}
    public function PreRequest(PostcodesioContext $ctx): void {}
    public function PreResponse(PostcodesioContext $ctx): void {}
    public function PreResult(PostcodesioContext $ctx): void {}
    public function PreDone(PostcodesioContext $ctx): void {}
    public function PreUnexpected(PostcodesioContext $ctx): void {}
}
