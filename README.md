# OpenNext Middleware WASM issue

## Getting started

### Prerequisites

- [Node.js 22](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) - to manage dependencies (usually comes installed with Node)
- Cloudflare account to create a D1 database

### Reproduction steps

1. Install dependencies with `npm i`
2. Start the Next.js Wrangler preview server with `npm run preview`
3. You should see the following error: `ENOENT: no such file or directory, open '.../opennext-middleware-wasm-issue/.open-next/middleware/wasm/wasm_ea010aa52414c7de383495546f15cb7d49b055fc.wasm'`
