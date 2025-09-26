# 🧰 Honobox

**Minimal deploy-ready starter for [Hono](https://hono.dev)** — with SSR pages, API routes, and SQLite (Drizzle ORM, Turso dialect).
Runs everywhere: **Bun • Node • Cloudflare • Vercel** ✨

---

## 🚀 Features

- ⚡ **Fast**: Hono framework + Bun/Node/CFW runtimes
- 🗄️ **SQLite with Drizzle ORM** (Turso dialect)
- 📝 **SSR Todo example** using [PicoCSS](https://picocss.com) (classless CSS)
- 🧩 **Middlewares**: logger, not-found, on-error, rate-limit, cache, emoji favicon, JSX
- 🧹 **Biome** for linting, formatting, checks
- 🔧 **Deploy-ready**: Vercel (zero-config) & Cloudflare (1 command)

---

## 🛠️ Getting Started

### 1. Clone & install

```bash
git clone https://github.com/mohxmd/honobox
cd honobox
bun install
```

### 2. Run locally

```bash
bun run dev
```

### 3. Database

```bash
# Generate + migrate
bun run db:generate
bun run db:migrate
```

### 4. Deploy

- **Vercel** → push to GitHub & import (zero-config)
- **Cloudflare** →

  ```bash
  bun run deploy:cfw
  ```

---

## 📂 Project Structure

```
src/
 ├── app.ts          # createApp + routes
 ├── index.ts        # Vercel entry (exports app)
 ├── server.ts       # local Bun/Node bootstrap
 ├── routes/
 │   ├── api/        # JSON APIs
 │   └── pages/      # SSR pages
 ├── middlewares/    # common middlewares
 ├── db/             # schema, queries, mutations
 └── components/     # SSR JSX components (e.g. Todo app)
```

---

## 🖥️ Examples

### Pages (SSR)

```ts
// src/routes/pages/hello.route.ts
const router = createRouter().get("/hello", (c) =>
  c.render(<h1>Hello Hono SSR!</h1>)
);
export default router;
```

### APIs

```ts
// src/routes/api/hello.route.ts
const router = createRouter().get("/", (c) => {
  c.var.logger.info("Hello");
  return c.json({ message: "Hello Hono!" }, 200);
});
export default router;
```

### Register routes

```ts
// src/app.ts
import hello from "@/routes/api/hello.route.ts";
import helloPage from "@/routes/pages/hello.route.ts";

const routes = [hello, helloPage] as const;
```
