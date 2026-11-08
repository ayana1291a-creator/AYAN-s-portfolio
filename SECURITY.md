# AYAN portfolio security notes

## Included protections

- The site is a static client application with no authentication, database, message storage, or server-side secret.
- External profile links use `target="_blank"` with `rel="noopener noreferrer"`.
- Deployment headers are defined in `vercel.json` and `public/_headers`: Content Security Policy, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a restrictive `Permissions-Policy`.
- The contact journey uses `mailto:` only. The website does not collect or transmit visitor information.
- The PDF is generated in the browser from public portfolio content; no private data is included.
- Reduced-motion preferences are respected and the custom cursor is disabled on touch devices.

## Deployment requirements

- Serve the site through the hosting platform over HTTPS.
- Keep the security headers enabled, or translate them to the equivalent configuration if deploying elsewhere.
- Keep dependency versions current and review audit findings before publishing.
- Do not add private API keys, analytics credentials, or message-service credentials to frontend code.
- Configure a real production domain in the sitemap once one exists; the current sitemap intentionally uses a root-relative URL.

These measures reduce common browser and deployment risks but do not make the site completely secure or unhackable.
