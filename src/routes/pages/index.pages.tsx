import { createRouter } from "@/lib/init-app";

function Home() {
  return (
    <>
      <header>
        <hgroup>
          <h1>🧰 Honobox</h1>
          <p>Minimal Hono starter — SSR pages & APIs. Styled by PicoCSS.</p>
        </hgroup>
      </header>

      <main>
        <section>
          <h2>Pages</h2>
          <ul>
            <li>
              <a href="/tasks">Tasks (SSR example)</a>
            </li>
          </ul>
        </section>

        <section>
          <h2>APIs</h2>
          <ul>
            <li>
              <a href="/api/hello">Hello API</a>
            </li>
            <li>
              <a href="/api/ai/geo/hello">AI Geo Greeting</a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Docs</h2>
          <ul>
            <li>
              <a href="https://hono.dev" target="_blank" rel="noreferrer">
                Hono
              </a>
            </li>
            <li>
              <a href="https://picocss.com" target="_blank" rel="noreferrer">
                PicoCSS
              </a>
            </li>
            <li>
              <a
                href="https://orm.drizzle.team"
                target="_blank"
                rel="noreferrer"
              >
                Drizzle ORM
              </a>
            </li>
            <li>
              <a href="https://zod.dev" target="_blank" rel="noreferrer">
                Zod
              </a>
            </li>
            <li>
              <a href="https://turso.tech" target="_blank" rel="noreferrer">
                Turso
              </a>
            </li>
            <li>
              <a
                href="https://ai-sdk.dev/docs/introduction"
                target="_blank"
                rel="noreferrer"
              >
                Ai
              </a>
            </li>

            <li>
              <a href="https://biomejs.dev" target="_blank" rel="noreferrer">
                Biome
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2>Source & About</h2>
          <ul>
            <li>
              <a
                href="https://github.com/mohxmd/honobox"
                target="_blank"
                rel="noreferrer"
              >
                Source Code (GitHub)
              </a>
            </li>
            <li>
              <a href="https://mohammedsh.xyz" target="_blank" rel="noreferrer">
                🌐 Me
              </a>
            </li>
            <li>
              <a
                href="https://mohammedsh.xyz/donate"
                target="_blank"
                rel="noreferrer"
              >
                💰 Donate
              </a>
            </li>
          </ul>
        </section>

        <footer>
          <small>Built with Hono • Bun/Node • CF Workers • Vercel</small>
        </footer>
      </main>
    </>
  );
}

const router = createRouter().get("/", (c) => c.render(<Home />));

export default router;
