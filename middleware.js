export const config = {
  matcher: [
    /*
     * Match all request paths except static asset extensions
     */
    '/((?!_vercel|favicon.ico|.*\\.(?:css|js|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|json|xml|txt)).*)',
  ],
};

const SENTINELGRID_INSPECT_URL = process.env.SENTINELGRID_INSPECT_URL || 'https://sentinelgrid-one.vercel.app/v1/inspect';

export default async function middleware(request) {
  const url = new URL(request.url);

  // Extract client IP from proxy headers
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.1';

  const queryString = url.search.replace(/^\?/, '');

  // Flatten incoming headers for WAAP inspection
  const headersObj = {};
  request.headers.forEach((val, key) => {
    headersObj[key] = val;
  });

  const inspectPayload = {
    website_id: 'site-agispro',
    method: request.method,
    path: url.pathname,
    query_params: queryString,
    headers: headersObj,
    client_ip: clientIp,
    body: ''
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 350);

    const inspectRes = await fetch(SENTINELGRID_INSPECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SentinelGrid-Edge-Connector/1.0.0'
      },
      body: JSON.stringify(inspectPayload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (inspectRes.ok) {
      const decision = await inspectRes.json();
      if (decision.action === 'BLOCK') {
        const errorHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>403 Forbidden - Threat Quarantined by SentinelGrid</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { background: #0c0e14; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1rem; box-sizing: border-box; }
    .card { background: #161a23; border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 14px; padding: 2.5rem; max-width: 520px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
    h1 { color: #ef4444; margin: 0 0 0.75rem 0; font-size: 1.4rem; letter-spacing: -0.02em; }
    p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.25rem 0; }
    .badge { display: inline-block; background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.35); padding: 0.35rem 0.85rem; border-radius: 8px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85rem; font-weight: 600; }
    .meta { margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.8rem; color: #64748b; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; line-height: 1.8; text-align: left; }
    .meta span { color: #cbd5e1; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🛡️💥</div>
    <h1>403 Forbidden &bull; Threat Quarantined</h1>
    <p>Your request has been analyzed and blocked at the edge by <strong>SentinelGrid NextGen WAAP</strong>.</p>
    <div class="badge">Mitigated: ${decision.rule_triggered || 'THREAT-DETECTED'}</div>
    <div class="meta">
      <div>&bull; Event ID: <span>${decision.event_id || 'ev-quarantine'}</span></div>
      <div>&bull; OWASP Category: <span>${decision.owasp_category || 'A03:Injection'}</span></div>
      <div>&bull; Risk Score: <span>${decision.risk_score || 100}/100</span></div>
      <div>&bull; Protected Domain: <span>aegispro.vercel.app</span></div>
      <div>&bull; Client IP: <span>${clientIp}</span></div>
    </div>
  </div>
</body>
</html>`;

        return new Response(errorHtml, {
          status: 403,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Blocked-By': 'SentinelGrid-WAAP',
            'X-Threat-Rule': decision.rule_triggered || 'THREAT-DETECTED',
            'X-Event-ID': decision.event_id || ''
          }
        });
      }
    }
  } catch (err) {
    // Fail-open ensures continuous availability if latency spike occurs
  }
}
