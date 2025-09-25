import env from "@/env";

import type { AppContext } from "../init-app";

type IpOptions = {
  disableIpTracking?: boolean;
  ipAddressHeaders?: string[];
};

export function getClientIp(
  c: AppContext,
  options: IpOptions = {}
): string | null {
  if (options.disableIpTracking) {
    return null;
  }

  if (env.NODE_ENV === "test") {
    return "127.0.0.1";
  }

  const defaultHeaders = [
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
    "cf-connecting-ip", // Cloudflare
    "true-client-ip", // Cloudflare Enterprise
  ];

  const ipHeaders = options.ipAddressHeaders || defaultHeaders;

  for (const headerName of ipHeaders) {
    const value = c.req.header(headerName);
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) {
        return ip;
      }
    }
  }

  return null;
}

function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split(".").map(Number);
    return parts.every((part) => part >= 0 && part <= 255);
  }

  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  if (ipv6Regex.test(ip)) {
    return true;
  }

  const ipv6WithIpv4Regex = /^::ffff:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/i;
  return ipv6WithIpv4Regex.test(ip);
}
