# OpenNext Middleware WASM issue

## Getting started

### Prerequisites

- [Node.js 22](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) - to manage dependencies (usually comes installed with Node)
- Cloudflare account to create a D1 database

### First time setup

1. Install dependencies with `npm i`
2. Create the Cloudflare D1 database with `wrangler d1 create OPENNEXT_TEST_DB`
    - From what I can see Wrangler does not allow you to use a local D1 database without creating a remote one
3. Paste the output database binding in the `d1_databases` key in `wrangler.jsonc`
    - Make sure you don't delete the migrations directory config
3. Generate the Cloudflare D1 database types & client through [Prisma](https://www.prisma.io/) with
   `npm run generate-db-types`
4. Apply the latest database schema locally with `npm run migrate:apply`
5. Start the Next.js Wrangler preview server with `npm run preview`
