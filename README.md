# OpenNext Middleware WASM issue

## Getting started

### Prerequisites

- [Node.js 22](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) - to manage dependencies (usually comes installed with Node)
- Cloudflare account to create a D1 database

### Reproduction steps

1. Install dependencies with `npm i`
2. Start the Next.js Wrangler preview server with `npm run preview`
3. You should see the following error: `Error: Build failed with 1 error:
.open-next/server-functions/default/middleware.mjs:6752:59: ERROR: Could not resolve "./wasm/wasm_ea010aa52414c7de383495546f15cb7d49b055fc.wasm"`

### Setting up D1 database for further testing

1. `npx wrangler d1 create <insert-db-name>`.
   - I have not found a way to create a D1 database only for local use with Wrangler. I assume you have a Cloudflare account that can create a remote D1 database?
3. Add config for the D1 database in `wrangler.jsonc`:
```json
	"d1_databases": [
		{
			"binding": "DB",
			"database_name": "<insert-database-name>",
			"database_id": "<insert-database-id>",
			"migrations_dir": "./migrations"
		}
	]
```
3. `npm run generate-db-types`.
   - This will generate the Prisma JavaScript client in `node_modules` based on `src/schema.prisma`.
5. `npm run dev` and visit `localhost:3000`.
   - This should generate the local D1 `.sqlite` files at `/opennext-middleware-wasm-issue/.wrangler/state/v3/d1/miniflare-D1DatabaseObject`. You can ignore the errors when visiting `localhost:3000`.
7. `npx wrangler d1 migrations create <insert-database-name> create_tables`
8. `npx prisma migrate diff --from-local-d1 --to-schema-datamodel ./src/schema.prisma --script --output ./migrations/0001_create_tables.sql`.
   - Generates migration script to create the initial tables with Prisma
9. `npx wrangler d1 migrations apply <insert-database-name>`
   - Tables should now be create in local D1 database

After that the database schema should be there without any populated data. Which should be enough to test the `await db['account'].findMany();` query in `middleware.ts` with `npm run preview`.
