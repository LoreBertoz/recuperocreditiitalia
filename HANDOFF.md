# HANDOFF — Sviluppo sito recuperocreditiitalia.it

Documento da consegnare a Claude Code per sviluppare l'applicazione. Leggere insieme a `CLAUDE.md` (regole tecniche e vincoli).

---

## 1. Obiettivo del progetto

Trasformare il dominio già di proprietà **recuperocreditiitalia.it** in un **portale/directory nazionale delle agenzie di recupero crediti in Italia**.

- Le **agenzie** pagano una **retta mensile come sponsor** per essere pubblicate e consigliate.
- Gli **utenti** (privati e aziende con crediti da recuperare) trovano l'agenzia giusta per **vicinanza geografica** (priorità #1) e **tipologia di servizio** (priorità #2).
- Il portale guadagna dagli sponsor e **reinveste in visibilità**; ma la leva strategica è il **traffico organico gratuito**.

**KPI di successo**: posizionamento su Google per query locali ("recupero crediti [città]", "agenzia recupero crediti [regione]", "recupero crediti giudiziale") + citazioni nelle risposte delle AI generative (GEO) + numero di lead verso gli sponsor.

---

## 2. Decisioni già prese (dal committente)

| Tema | Decisione |
|------|-----------|
| Gestione dati agenzie | **CMS headless** (Payload CMS, con pannello di amministrazione) |
| Pagamenti sponsor | **Manuali all'inizio**; predisporre Stripe ma attivazione a mano |
| Scope prima release | **Completo**: MVP + blog/guide + area riservata agenzie + predisposizione pagamenti |
| Hero home | **Mappa interattiva** dell'Italia + ricerca immediata |
| Lingua | Italiano |
| Stack | Next.js 15 + TypeScript + Tailwind + Payload CMS + Postgres (vedi CLAUDE.md) |

Nota: pur avendo scelto scope "completo", i **pagamenti restano manuali** in questa fase — l'area riservata e Stripe vanno **predisposti** ma il flusso di attivazione sponsor è manuale dal pannello.

---

## 3. Tipologie di servizio (Services) da prevedere

Popolare il CMS almeno con:

- Recupero crediti **stragiudiziale** (bonario)
- Recupero crediti **giudiziale** (legale)
- Recupero crediti **commerciali B2B**
- Recupero crediti **verso privati**
- Recupero crediti **internazionale**
- **Cessione del credito** / acquisto crediti (NPL)
- Recupero **canoni di locazione / condominiali** (opzionale)
- **Informazioni commerciali** e visure (opzionale)

Queste alimentano il filtro di ricerca e le pagine `/servizi/[servizio]`.

---

## 4. Struttura geografica (Locations)

Gerarchia: **Regione → Provincia → Città**. Popolare almeno le 20 regioni e i capoluoghi di provincia; le città minori si aggiungono dove ci sono agenzie o volume di ricerca. Ogni Location ha coordinate (per la mappa) e un paragrafo descrittivo SEO.

Priorità di ricerca per l'utente: **prima la vicinanza geografica**, poi il servizio.

---

## 5. Mappa del sito (pagine)

**Pagine principali**
- Home (`/`) — hero con mappa + ricerca (vedi §7)
- Risultati ricerca (`/cerca?loc=…&servizio=…`) — lista agenzie filtrata e ordinata
- Pagine località — `/recupero-crediti/[regione]`, `/…/[provincia]`, `/…/[citta]`
- Pagine servizio — `/servizi/[servizio]` e combinazioni `/servizi/[servizio]/[regione]`
- Scheda agenzia — `/agenzie/[slug]`
- Diventa partner/sponsor — `/diventa-partner` (pagina vendita + prezzi + form)
- Come funziona — `/come-funziona`
- Guide/blog — `/guide` e `/guide/[slug]`
- Chi siamo — `/chi-siamo`
- Contatti — `/contatti`
- Legali — `/privacy`, `/cookie-policy`, `/termini`

**Area riservata**
- Login agenzie — `/area-riservata`
- Dashboard agenzia — gestione della propria scheda (dati, logo, servizi, zone, orari, contatti). Le modifiche possono andare in stato "in revisione" prima della pubblicazione (a scelta: auto-pubblicazione per tier alti).

**Consigliate (le suggerisco io, come richiesto)**
- **Recensioni** agenzie (fase 2) — utili per fiducia + rich snippet stelle.
- **Confronta agenzie** (fase 2).
- **Glossario/FAQ** del recupero crediti — ottimo per SEO informazionale e GEO.
- **Landing "recupero crediti [città]"** curate per le 10-15 città a maggior volume.
- Newsletter (raccolta email) — asset di marketing a costo zero.

---

## 6. Modello di sponsorizzazione (da implementare a livello dati/UI, incasso manuale)

Tre livelli (esempio, i prezzi li definisce il committente):

- **Base** — presenza in directory, scheda standard, 1 zona.
- **Premium** — badge verificato, posizionamento prioritario nei risultati, più zone, logo in evidenza.
- **Top** — massima priorità, presenza in home ("agenzie in evidenza"), banner nelle pagine località della sua zona.

Ordinamento risultati = **vicinanza geografica** come criterio primario, con **boost per tier** a parità/vicinanza. Documentare chiaramente la logica di ranking nel codice.

Attivazione: il committente riceve il pagamento offline e imposta `subscriptionStatus = active` + `sponsorTier` nel pannello. Stripe predisposto per automatizzare in seguito.

---

## 7. Home page in dettaglio

**Hero**
- Mappa interattiva dell'Italia (regioni cliccabili → portano alla pagina regione o filtrano la ricerca).
- Barra di ricerca sovrapposta/adiacente con:
  - Campo **Località** (autocomplete su regione/provincia/città + opzione "Usa la mia posizione").
  - Select **Tipologia di servizio**.
  - Bottone **Trova agenzia**.
- Headline chiara del valore ("Trova l'agenzia di recupero crediti più vicina a te").

**Sotto la hero**
- Come funziona in 3 step.
- Card dei servizi principali.
- Agenzie in evidenza (sponsor Top/Premium attivi).
- Regioni/città più cercate (link interni).
- Ultime guide dal blog.
- CTA "Sei un'agenzia? Diventa partner".
- Footer ricco con link a regioni, servizi, legali.

Design: professionale, affidabile, pulito; mobile-first; performance elevata (la mappa non deve degradare i Core Web Vitals — caricarla in modo ottimizzato).

---

## 8. SEO & GEO — priorità assoluta

Riepilogo operativo (dettagli completi in `CLAUDE.md` §5-6):

- Rendering statico/SSR di tutte le pagine indicizzabili; ISR per aggiornare dai dati CMS.
- URL italiani gerarchici, canonical, sitemap dinamica, robots.txt, `llms.txt`.
- JSON-LD: `Organization`, `WebSite`+`SearchAction`, `LocalBusiness` (schede), `BreadcrumbList`, `FAQPage`, `Article`.
- Contenuto unico e utile su ogni pagina località/servizio — **niente pagine vuote**.
- Internal linking forte tra regioni, province, città, servizi e agenzie.
- Core Web Vitals ottimizzati (`next/image`, `next/font`, lazy della mappa).
- Blog di guide fin dal lancio (asset SEO+GEO): partire con 3-5 articoli seed.
- GA4 + Search Console predisposti; cookie banner GDPR + Consent Mode.

---

## 9. Roadmap a fasi (consegnare valore presto)

**Fase 0 — Setup**
Init Next.js + TypeScript + Tailwind + shadcn + Payload + Postgres. Layout base, header/footer, tema, componenti UI. Env e README.

**Fase 1 — Dati e CMS**
Collection Payload (Agencies, Locations, Services, BlogPosts, LeadRequests, Users). Access control. Seed di dati d'esempio (regioni, servizi, 5-8 agenzie fittizie, 3 guide).

**Fase 2 — Pagine pubbliche core**
Home con hero-mappa + ricerca. Pagina risultati con filtro località+servizio e ranking. Schede agenzia. Pagine località (regione/provincia/città) e servizio, con contenuto e internal linking. Pagine statiche (come funziona, chi siamo, contatti, legali).

**Fase 3 — SEO/GEO tecnica**
Metadata dinamici, JSON-LD, sitemap, robots, llms.txt, canonical, breadcrumb, ottimizzazione performance. GA4 + Search Console + cookie banner.

**Fase 4 — Monetizzazione & area riservata**
Pagina "Diventa partner" con tier e form (→ LeadRequests). Logica tier/`subscriptionStatus`. Area riservata agenzie (login + dashboard self-service). Predisposizione Stripe (config + webhook stub, non live).

**Fase 5 — Blog & rifinitura**
Sistema blog/guide completo, FAQ/glossario, agenzie in evidenza in home, QA accessibilità, test build, checklist SEO finale, documentazione deploy.

A fine di ogni fase: `next build` pulito, niente errori TS/lint, breve nota delle assunzioni fatte.

---

## 10. Cosa serve dal committente (raccogliere in parallelo, non blocca lo sviluppo con dati seed)

- Logo / brand (o Claude Code propone un'identità provvisoria).
- Prezzi e nome definitivi dei tre tier.
- Testi "Chi siamo" e contatti reali (email, telefono, P.IVA per i legali).
- Eventuale primo elenco reale di agenzie da caricare.
- Account Google (Analytics + Search Console), account hosting/DB, dominio (già posseduto: recuperocreditiitalia.it) per il collegamento DNS al deploy.

## 11. Note legali (Italia/GDPR) — non dimenticare

- Privacy policy, cookie policy, termini di servizio.
- Cookie banner conforme + Consent Mode v2 per GA4.
- Base giuridica per la pubblicazione dei dati delle agenzie (sono clienti/sponsor → consenso contrattuale).
- Form di contatto/lead con informativa privacy e checkbox consenso.

---

## 12. Definizione di "fatto" per la prima release

Il sito è pronto al lancio quando:
1. Un utente può cercare per località + servizio e ricevere agenzie ordinate per vicinanza (+ boost tier).
2. Esistono pagine località e servizio indicizzabili, con contenuto unico e schema markup.
3. Le schede agenzia sono complete, con `LocalBusiness` JSON-LD.
4. Sitemap, robots, metadata, GA4, cookie banner e pagine legali sono attivi.
5. Esiste la pagina "Diventa partner" con form funzionante e l'area riservata agenzie.
6. Il blog ha almeno 3-5 guide pubblicate.
7. `next build` passa, performance e Core Web Vitals sono buoni, README di deploy presente.
