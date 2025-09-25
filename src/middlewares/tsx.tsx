import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

export const tsx = (): MiddlewareHandler =>
  jsxRenderer(({ children }) => {
    return (
      <html lang="en" data-theme="auto">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light dark" />

          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
        </head>
        <body>
          <main className="container">{children}</main>
        </body>
      </html>
    );
  });
