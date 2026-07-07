# recuperocreditiitalia.it

Directory nazionale delle agenzie di recupero crediti in Italia. Gli utenti (privati e aziende) cercano l'agenzia per **vicinanza geografica** e **tipologia di servizio**; le agenzie pagano una retta mensile come sponsor.

## Stack

- **Next.js 15** (App Router) + **TypeScript** strict
- **Tailwind CSS 4** + **shadcn/ui**
- **Payload CMS 3** (embeddato nella stessa app: CMS + auth + area riservata agenzie)
- **PostgreSQL** (locale in dev, Supabase in produzione)
- Deploy: **Vercel**

## Requisiti

- Node.js ≥ 20.9
- pnpm ≥ 9 (`corepack enable` oppure `npm i -g pnpm`)
- PostgreSQL ≥ 15 in esecuzione locale (su macOS: `brew install postgresql@17 && brew services start postgresql@17`)

## Avvio in locale

```bash
# 1. Clona/entra nella cartella del progetto
cd site

# 2. Installa le dipendenze
pnpm install

# 3. Crea il database locale (una sola volta)
createdb recuperocrediti

# 4. Configura le variabili d'ambiente
cp .env.example .env
# poi apri .env e imposta DATABASE_URL e PAYLOAD_SECRET (openssl rand -hex 32)

# 5. Avvia il dev server
pnpm dev
```

- Sito: http://localhost:3000
- Pannello admin Payload: http://localhost:3000/admin
- Area riservata agenzie: http://localhost:3000/area-riservata

```bash
# 6. Popola il database con i dati di esempio (idempotente, si può rilanciare)
pnpm seed
```

**Credenziali di sviluppo create dal seed** (solo dev — cambiarle/eliminarle in produzione):

| Ruolo | Email | Password |
|---|---|---|
| Admin (pannello /admin) | `admin@recuperocreditiitalia.it` | `admin1234!dev` |
| Agenzia demo (area riservata) | `agenzia@recuperamilano.example` | `agenzia1234!dev` |

Il seed crea: 20 regioni + 107 province (con coordinate e testi SEO), 8 servizi con FAQ, 6 agenzie fittizie (5 attive, 1 `pending` per verificare che non venga pubblicata), 3 guide.

In sviluppo Payload sincronizza lo schema del database automaticamente (`push mode`). Le migrazioni versionate arriveranno prima del deploy in produzione.

## Script utili

| Comando | Cosa fa |
|---|---|
| `pnpm dev` | Dev server (Next.js + Payload admin) |
| `pnpm build` | Build di produzione |
| `pnpm start` | Avvia la build di produzione |
| `pnpm lint` | ESLint |
| `pnpm generate:types` | Rigenera `src/payload-types.ts` dalle collection |
| `pnpm generate:importmap` | Rigenera l'import map del pannello admin |
| `pnpm seed` | Popola il DB con i dati di esempio (da Fase 1) |

## Variabili d'ambiente

Vedi [.env.example](.env.example) — documentate lì. Mai committare `.env`.

## Deploy (Vercel + Supabase)

1. **Database**: progetto Supabase già creato (`recuperocreditiitalia`, regione `eu-central-1`, ref `ufasmcyggdqaqjefzzup`). Recupera la connection string da *Dashboard Supabase → Settings → Database* (usa la porta 5432 "direct connection" oppure il pooler in modalità `session` — Payload richiede sessioni persistenti, non `transaction` mode).
2. **Vercel**: importa il repo, framework preset "Next.js". Imposta le env: `DATABASE_URL` (Supabase), `PAYLOAD_SECRET` (nuova chiave!), `NEXT_PUBLIC_SITE_URL=https://www.recuperocreditiitalia.it`, e le chiavi GA4/Stripe quando disponibili.
3. **Dominio**: punta `recuperocreditiitalia.it` a Vercel (record DNS da pannello Vercel → Domains).
4. Prima release: eseguire il seed dei dati e creare l'utente admin da `/admin`.

## Struttura del progetto

```
site/
├── src/
│   ├── app/
│   │   ├── (frontend)/     ← sito pubblico (layout, pagine)
│   │   └── (payload)/      ← pannello admin + API Payload (non toccare)
│   ├── collections/        ← collection Payload (Users, Media, poi Agencies, Locations, …)
│   ├── components/
│   │   ├── layout/         ← header, footer
│   │   └── ui/             ← componenti shadcn/ui
│   ├── lib/                ← utility condivise
│   └── payload.config.ts   ← configurazione Payload CMS
├── .env.example            ← template variabili d'ambiente
└── components.json         ← configurazione shadcn/ui
```

## Regole di progetto (riassunto — dettagli in ../CLAUDE.md e ../HANDOFF.md)

- Un'agenzia è pubblica **solo** se `subscriptionStatus === 'active'`.
- Pagamenti **manuali** in questa fase: lo sponsor si attiva cambiando stato nel pannello admin. Stripe è solo predisposto.
- SEO/GEO è la priorità assoluta: pagine località/servizio statiche con contenuto unico, JSON-LD, sitemap dinamica, `llms.txt`.
- Contenuti visibili all'utente in italiano; codice e nomi file in inglese.
