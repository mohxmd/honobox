import { handleStreamResponse } from "@/lib/ai";
import { createRouter } from "@/lib/init-app";
import { getCountryFromIp } from "@/lib/utils/get-country";
import { getClientIp } from "@/lib/utils/get-request-ip";

export default createRouter()
  .basePath("/api/ai")
  .get("/geo/hello", async (c) => {
    const ip = getClientIp(c);
    const country = getCountryFromIp(ip, c.req.raw.headers);

    const prompt =
      country === "Localhost"
        ? "Say hello in English."
        : `Say hello in the primary language of ${country}.`;

    return await handleStreamResponse(c, prompt);
  });
