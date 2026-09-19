# Security Policy

## Supported versions

The supported maintenance line is the latest `1.x` release. The current
published package version is `1.0.0-rc.0`; reports against this prerelease are
welcome.

| Version | Supported |
| --- | --- |
| Latest `1.x` release | Yes |
| Older major versions | No |

Please upgrade to the latest supported version before reporting a vulnerability
when possible.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting form first:

[Report a vulnerability privately through GitHub](https://github.com/kurone-kito/dantalion/security/advisories/new)

If the private reporting form is unavailable, email `krone@kit.black` instead.
Please do not open a public issue for an unreported vulnerability.

Include the following details when possible:

- the affected package and version;
- a concise description of the vulnerability and its impact;
- reproducible steps or a minimal proof of concept; and
- your preferred contact and disclosure timeline.

Remove secrets and other sensitive data from reports before sending them.

## Response and disclosure

We aim to acknowledge reports within seven calendar days. We investigate
reports privately and coordinate validation, fixes, and disclosure timing with
the reporter. We will credit reporters who wish to be identified.

There is no guaranteed remediation timeline. Fix timing depends on the
severity and complexity of the issue and maintainer availability.

## Scope

This policy covers the following packages and the repository's release path:

- `@kurone-kito/dantalion-core`;
- `@kurone-kito/dantalion-i18n`; and
- `@kurone-kito/dantalion-cli`.

The separate [dantalion-web-demo](https://github.com/kurone-kito/dantalion-web-demo)
repository is out of scope. Please report issues affecting that web demo in its
repository.
