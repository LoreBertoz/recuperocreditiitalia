# Deploy — recuperocreditiitalia.it

## Hosting
- **Vercel** project `site` (team `lbertoni115-4051s-projects`), root directory `site/`.
- **GitHub** `LoreBertoz/recuperocreditiitalia` connected → **push to `main` = auto production deploy**.
- **Database**: Supabase Postgres.

## Connessioni database (IMPORTANTE — non confondere le porte)

Vercel non ha rete IPv6: la connessione diretta `db.<ref>.supabase.co:5432` fallisce con
`ENETUNREACH`. Usare **sempre il pooler**.

| Uso | Host:Porta | Modalità |
|-----|-----------|----------|
| Runtime (Vercel, `DATABASE_URL`) | `aws-0-eu-central-1.pooler.supabase.com:6543` | transaction |
| Migrazioni (locale) | `aws-0-eu-central-1.pooler.supabase.com:5432` | session (DDL-safe) |

Stessa password per entrambe le porte.

## Variabili ambiente (Vercel — Production)
- `DATABASE_URL` — pooler transaction (`:6543`), tipo Sensitive.
- `PAYLOAD_SECRET` — `openssl rand -hex 32`.

## Migrazioni Payload
Le migrazioni vivono in `src/migrations/` e vanno **committate**.

```bash
# genera migrazione da modifiche schema (usa il session pooler :5432)
DATABASE_URL="postgresql://postgres.<ref>:<pw>@aws-0-eu-central-1.pooler.supabase.com:5432/postgres" \
  node_modules/.bin/payload migrate:create

# applica al database
DATABASE_URL="...:5432/postgres" node_modules/.bin/payload migrate
```

## Deploy manuale (fallback)
```bash
cd site && npx vercel deploy --prod
```

## Note
- Usare `pnpm@10` in locale (engines: `^9 || ^10`). `npx --yes pnpm@10 install`.
- Primo admin: creare account su `/admin`.
