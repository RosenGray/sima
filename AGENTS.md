# AGENTS.md

## Cursor Cloud specific instructions

### Project overview
SIMA Board is a Russian-language classified ads marketplace for Israel. The main application is a Next.js 16 app located in `client/`. See `client/README.md` for standard Next.js commands.

### Services

| Service | How to run | Port | Notes |
|---------|-----------|------|-------|
| Next.js dev server | `npm run dev` (in `client/`) | 3000 | Uses Turbopack |
| MongoDB | `sudo mongod --port 30016 --dbpath /data/db --fork --logpath /var/log/mongod.log` | 30016 | Must be running before the app starts |

### Environment variables
- `JWT_KEY` is **required** — set in `client/.env.local` (e.g. `JWT_KEY=dev-secret-key-for-local-development`).
- `MONGO_URI` defaults to `mongodb://localhost:30016/sima` in dev mode; no need to set unless using a remote DB.
- Optional: `BACKBLAZEB_*` keys (file uploads), `MAILER_SEND_API_KEY` (emails), `RECAPTCHA_SECRET_KEY` (captcha).

### Linting and type checking
- **Lint**: `npx eslint src/` (run from `client/`). Note: `next lint` was removed in Next.js 16; use ESLint directly.
- **Type check**: `npm run type-check` (runs `tsc --noEmit`).

### Gotchas
- MongoDB must listen on port **30016** (not the default 27017). The app hardcodes this in `src/lib/mongo/mongodb.ts` for dev mode.
- The `npm run lint` script invokes `next lint` which no longer exists in Next.js 16. Use `npx eslint src/` instead.
- There is no `.env.example` file. Create `client/.env.local` with at minimum `JWT_KEY=<any-secret>`.
- The `common/` package (`@sima-board/common`) is published to npm and consumed as a dependency — no need to build it locally.
