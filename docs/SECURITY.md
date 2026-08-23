# RefX Security & Safe Link Policy

RefX takes link safety and phishing prevention seriously.

## Outbound Referral Redirect Safety
1. **Domain Whitelisting**: Outbound redirects `/r/:slug` are strictly restricted to verified corporate apex domains matching `official_website`.
2. **Open Redirect Mitigation**: Direct arbitrary query parameters cannot redirect to third-party domains.
3. **Automated Threat Scanning**: URLs are checked for suspicious parameters and URL shortener chains.

## Reporting Security Vulnerabilities
If you discover a security flaw or malicious entry, please email `security@refx.in` or create a security advisory on GitHub.
