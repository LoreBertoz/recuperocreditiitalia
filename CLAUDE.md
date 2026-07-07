# CLAUDE.md — recuperocreditiitalia.it

> Guida operativa per Claude Code. Leggere **tutto** prima di iniziare a scrivere codice.
> Documento complementare: `HANDOFF.md` (brief funzionale completo, requisiti, pagine, SEO/GEO, roadmap).

---

## 1. Cos'è questo progetto

Directory / portale verticale che mette in contatto **utenti (privati e aziende) che devono recuperare un credito** con le **agenzie di recupero crediti in Italia**.

Modello di business: le agenzie pagano una **retta mensile come sponsor** per essere pubblicate e consigliate. Gli utenti cercano l'agenzia per **vicinanza geografica** (priorità #1) e per **tipologia di servizio** (priorità #2).

Obiettivo strategico primario: **traffico organico**. Il sito deve essere ottimizzato al massimo per **SEO** (Google) e **GEO** (Generative Engine Optimization: essere citato da ChatGPT, Gemini, Perplexity, ecc.). I guadagni degli sponsor vengono reinvestiti in visibilità, ma l'architettura deve permettere di posizionarsi anche naturalmente senza spendere.

---

## 2. Stack tecnico (decisioni prese — NON cambiare senza chiedere)

- **Framework**: Next.js 15 (App Router) + TypeScript in strict mode.
- **Styling**: Tailwind CSS + shadcn/ui per i componenti. Design pulito, professionale, moderno.
- **CMS / dati**: **Payload CMS 3** embeddato nella stessa app Next.js. Gestisce agenzie (listing), pagine servizio/località, blog e **autenticazione + area riservata delle agenzie** in un unico sistema.
- **Database**: PostgreSQL (Supabase o Neon). Payload usa l'adapter Postgres.
- **Mappa**: MapLibre GL JS (o React-Leaflet) con GeoJSON dei confini regionali/provinciali italiani per la Hero interattiva.
- **Pagamenti**: **manuali all'inizio**. Predisporre l'integrazione Stripe (campo `subscriptionStatus`, webhook stub) ma l'attivazione dello sponsor avviene a mano cambiando lo stato nel pannello Payload. NON implementare checkout automatico nella prima release se non esplicitamente confermato.
- **Deploy**: Vercel (frontend + Payload) + database Postgres gestito. Predisporre variabili ambiente e `README` per il deploy.
- **Analytics**: Google Analytics 4 + Google Search Console (predisporre gli slot, chiavi via env).

Motivazione della scelta CMS: l'utente ha richiesto scope **completo** (blog + area riservata agenzie + predisposizione pagamenti). Payload unifica CMS headless, database, auth e access control, evitando di dover cucire insieme più servizi.

---

## 3. Modello dati (collezioni Payload)

Progettare almeno queste collection (i campi sono indicativi, espandere se serve):

- **Agencies** (le agenzie sponsor)
  - `name`, `slug`, `logo`, `descriptionShort`, `descriptionLong` (rich text)
  - `services` (relazione multipla → Services)
  - `coverageAreas` (relazione multipla → Locations: regioni/province/città coperte)
  - `headquarters` (indirizzo + `lat`/`lng` per la mappa)
  - `contactPhone`, `contactEmail`, `website`, `whatsapp`
  - `sponsorTier` (`base` | `premium` | `top`) → determina priorità di ordinamento e visibilità
  - `subscriptionStatus` (`pending` | `active` | `suspended`) → solo le `active` sono pubbliche
  - `verified` (badge "Sponsor verificato")
  - `rating` / `reviewsCount` (opzionale, fase 2)
  - SEO fields (metaTitle, metaDescription) per la scheda
- **Locations** (gerarchia geografica)
  - `type` (`regione` | `provincia` | `citta`), `name`, `slug`, `parent` (self-relation), `lat`, `lng`, testo descrittivo SEO per pagina località
- **Services** (tipologie di servizio)
  - Es. stragiudiziale, giudiziale, crediti commerciali B2B, crediti verso privati, recupero internazionale, cessione del credito, ecc.
  - `name`, `slug`, `description`, SEO fields
- **BlogPosts** (guide/articoli per SEO+GEO)
  - `title`, `slug`, `cover`, `excerpt`, `body` (rich text), `author`, `publishedAt`, `tags`, SEO fields, FAQ schema
- **LeadRequests** (richieste "Diventa sponsor" + eventuali richieste utenti)
- **Users** (staff admin + account agenzie per l'area riservata, con ruoli/access control)

Regola d'oro: **una agenzia è pubblica solo se `subscriptionStatus === 'active'`**. Filtrare sempre lato query.

---

## 4. Architettura URL (critica per la SEO — rispettarla)

URL puliti, in italiano, gerarchici. Esempi:

- `/` — home
- `/recupero-crediti/[regione]` — es. `/recupero-crediti/lombardia`
- `/recupero-crediti/[regione]/[provincia]` — es. `/recupero-crediti/lombardia/milano`
- `/recupero-crediti/[regione]/[provincia]/[citta]` — pagina città (massima intenzione locale)
- `/servizi/[servizio]` — es. `/servizi/recupero-crediti-giudiziale`
- `/servizi/[servizio]/[regione]` — combinazione servizio+località (long-tail ad alto valore)
- `/agenzie/[slug]` — scheda agenzia
- `/guide/[slug]` — blog/guide
- `/diventa-partner` — pagina vendita sponsorizzazioni + form
- `/come-funziona`, `/chi-siamo`, `/contatti`
- `/privacy`, `/cookie-policy`, `/termini` — obbligatorie (GDPR/Italia)

Le pagine località e servizio devono essere **generate staticamente** (SSG con `generateStaticParams`) e rigenerate on-demand (ISR / revalidate) quando cambiano i dati nel CMS.

**Mai pagine vuote**: ogni pagina località/servizio deve avere testo unico e utile (Google penalizza le "doorway pages" e i thin content). Il CMS deve poter contenere un paragrafo descrittivo per ogni Location e Service; dove manca, generare un fallback testuale sensato ma variato.

---

## 5. Requisiti SEO (non negoziabili)

- Rendering **server-side / statico** di tutte le pagine indicizzabili (no contenuto solo client-side).
- **Metadata API** di Next.js per title/description dinamici per ogni pagina.
- **JSON-LD Schema.org** su ogni pagina pertinente:
  - `Organization` + `WebSite` (con `SearchAction`) globali
  - `LocalBusiness` per ogni scheda agenzia
  - `BreadcrumbList` su tutte le pagine gerarchiche
  - `FAQPage` sulle guide e sulle pagine che hanno FAQ
  - `Article` sui post del blog
- **Sitemap.xml dinamica** (`app/sitemap.ts`) che include tutte le pagine località, servizio, agenzia e guide.
- **robots.txt** corretto (`app/robots.ts`).
- **Canonical** URL su ogni pagina; gestione corretta della paginazione.
- Titoli H1 unici per pagina, gerarchia heading corretta.
- **Core Web Vitals**: ottimizzare LCP/CLS/INP. Usare `next/image`, font locali (`next/font`), lazy-load della mappa (è pesante: caricarla dinamicamente lato client sotto la fold logica ma senza bloccare l'indicizzazione dei contenuti).
- Internal linking forte: ogni pagina località linka province/città figlie, servizi correlati e agenzie in zona.
- `hreflang` non necessario ora (solo IT), ma predisporre `lang="it"`.

## 6. Requisiti GEO (Generative Engine Optimization)

- Contenuti strutturati in **domanda/risposta** e definizioni chiare (le AI citano risposte concise e ben delimitate).
- Sezioni FAQ con markup `FAQPage` su pagine chiave.
- Dati fattuali espliciti e citabili (es. "A Milano operano X agenzie di recupero crediti…").
- File **`llms.txt`** nella root con descrizione del sito e link alle risorse principali.
- Autorevolezza: pagine "Chi siamo", autore degli articoli, fonti citate nelle guide.
- Linguaggio naturale e completo nelle guide (le AI preferiscono contenuti esaustivi e ben organizzati).

---

## 7. Home page — requisiti

1. **Hero**: **mappa interattiva dell'Italia** (regioni cliccabili) con sopra/accanto una **barra di ricerca** immediata.
2. **Ricerca** (subito sotto/dentro la hero), con priorità:
   - **Località** (campo principale: autocomplete regione/provincia/città, oppure "usa la mia posizione" via geolocalizzazione browser).
   - **Tipologia di servizio** (select dai Services).
   - CTA "Trova agenzia".
3. Sezioni sotto la hero: come funziona (3 step), servizi principali (card), agenzie in evidenza (sponsor top), regioni più cercate, guide recenti dal blog, CTA "Diventa partner".
4. Design bello e professionale, mobile-first, veloce.

La ricerca porta a una pagina risultati filtrata per località + servizio, con ordinamento: **prima la vicinanza geografica**, poi boost per `sponsorTier`.

---

## 8. Convenzioni di codice

- TypeScript strict, no `any` non giustificati.
- Componenti server di default; `"use client"` solo dove serve interattività (mappa, form, autocomplete).
- Struttura cartelle chiara: `app/`, `components/`, `lib/`, `collections/` (Payload), `content/`.
- Nomi file e componenti in inglese; **contenuti visibili all'utente in italiano**.
- Commit atomici e messaggi descrittivi.
- Env vars in `.env.local`, documentate in `.env.example`. Mai committare segreti.
- Accessibilità: contrasto, alt text, label sui form, navigazione da tastiera.
- Testi legali/GDPR: predisporre pagine e banner cookie conforme (es. con Consent Mode v2 per GA4).

---

## 9. Come lavorare (workflow atteso da Claude Code)

1. Leggere `HANDOFF.md` per i dettagli funzionali e la roadmap a fasi.
2. Inizializzare il progetto (Next.js + Payload + Tailwind + shadcn).
3. Definire le collection Payload e il seed di dati di esempio (alcune agenzie fittizie, regioni, servizi, 2-3 guide).
4. Costruire per fasi come indicato nella roadmap dell'handoff; consegnare qualcosa di navigabile presto.
5. Prima di ogni fase successiva, verificare build (`next build`) e assenza di errori TypeScript/lint.
6. Documentare in `README.md` come far girare il progetto in locale e come fare il deploy.

## 10. Regole importanti

- **Non** pubblicare agenzie non `active`.
- **Non** creare thin/doorway pages: ogni pagina generata deve avere valore e contenuto unico.
- **Non** introdurre servizi a pagamento (Stripe live) senza conferma esplicita.
- **Non** cambiare lo stack deciso senza segnalarlo e chiedere.
- Se un requisito è ambiguo, fare l'assunzione più ragionevole, **documentarla** e proseguire, poi elencare le assunzioni a fine fase.
- Priorità assoluta in ogni decisione tecnica: **SEO/GEO e performance**.
