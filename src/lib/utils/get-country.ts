/**
 * Very simple country resolver.
 * Uses platform headers when available, falls back to "Localhost"/🌐.
 */
export function getCountryFromIp(ip: string | null, headers?: Headers): string {
  if (headers) {
    const cfCountry = headers.get("cf-ipcountry");
    if (cfCountry) return cfCountry;

    const vercelCountry = headers.get("x-vercel-ip-country");
    if (vercelCountry) return vercelCountry;
  }

  if (!ip) return "🌐";
  if (ip.startsWith("127.") || ip === "::1") return "Localhost";

  return "unknown";
}
