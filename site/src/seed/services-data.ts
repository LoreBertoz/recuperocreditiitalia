/** Le 8 tipologie di servizio previste dall'handoff, con contenuti SEO/GEO completi. */

type Faq = { question: string; answer: string }

export type ServiceSeed = {
  name: string
  slug: string
  order: number
  shortDescription: string
  paragraphs: ({ h2: string } | { p: string } | { li: string[] })[]
  faq: Faq[]
  metaTitle: string
  metaDescription: string
}

export const services: ServiceSeed[] = [
  {
    name: 'Recupero crediti stragiudiziale',
    slug: 'recupero-crediti-stragiudiziale',
    order: 1,
    shortDescription:
      'Il recupero bonario del credito: solleciti, diffide e negoziazione con il debitore, senza passare dal tribunale. È la via più rapida ed economica.',
    paragraphs: [
      {
        p: 'Il recupero crediti stragiudiziale è l’attività di recupero di un credito insoluto senza ricorrere al giudice: l’agenzia contatta il debitore tramite solleciti telefonici, lettere di diffida, email certificate e visite domiciliari, con l’obiettivo di ottenere il pagamento o un piano di rientro concordato.',
      },
      { h2: 'Quando conviene la via stragiudiziale' },
      {
        p: 'È quasi sempre il primo passo: costa meno di una causa, richiede settimane invece che anni e preserva la relazione commerciale con il cliente. Conviene quando il debitore è rintracciabile e solvibile, quando il credito è documentato (fatture, contratti, ordini) e quando l’importo non giustifica ancora i costi di un’azione legale.',
      },
      { h2: 'Come lavora l’agenzia' },
      {
        li: [
          'Analisi preliminare del credito e verifica della solvibilità del debitore',
          'Sollecito telefonico e scritto (phone collection e lettere di diffida)',
          'Diffida ad adempiere firmata da un legale, con messa in mora',
          'Negoziazione di piani di rientro e saldo e stralcio',
          'Esattoria domiciliare dove serve il contatto diretto',
        ],
      },
      {
        p: 'Se la fase bonaria non produce risultati, l’agenzia consiglia il passaggio alla fase giudiziale, fornendo al legale tutta la documentazione e le informazioni raccolte.',
      },
    ],
    faq: [
      {
        question: 'Quanto dura il recupero crediti stragiudiziale?',
        answer:
          'In media da 2 settimane a 3 mesi, a seconda della collaborazione del debitore e della complessità della pratica. Le agenzie serie forniscono un report periodico sullo stato della pratica.',
      },
      {
        question: 'Quanto costa il recupero stragiudiziale?',
        answer:
          'La maggior parte delle agenzie lavora a provvigione sul recuperato (success fee), tipicamente tra il 5% e il 20% in base a importo e anzianità del credito. Alcune chiedono un piccolo contributo fisso di apertura pratica.',
      },
      {
        question: 'La diffida interrompe la prescrizione del credito?',
        answer:
          'Sì: una diffida scritta con messa in mora, inviata con raccomandata A/R o PEC, interrompe la prescrizione, che ricomincia a decorrere da capo.',
      },
    ],
    metaTitle: 'Recupero crediti stragiudiziale: come funziona, tempi e costi',
    metaDescription:
      'Recupero crediti stragiudiziale (bonario): solleciti, diffide, piani di rientro. Tempi, costi e agenzie specializzate in tutta Italia.',
  },
  {
    name: 'Recupero crediti giudiziale',
    slug: 'recupero-crediti-giudiziale',
    order: 2,
    shortDescription:
      'Il recupero del credito per via legale: decreto ingiuntivo, precetto e pignoramento. Quando la via bonaria non basta, si passa al tribunale.',
    paragraphs: [
      {
        p: 'Il recupero crediti giudiziale è il recupero di un credito attraverso l’autorità giudiziaria. Il percorso tipico parte dal decreto ingiuntivo, prosegue con l’atto di precetto e arriva, se necessario, al pignoramento dei beni del debitore (conto corrente, stipendio, immobili, beni mobili).',
      },
      { h2: 'Quando serve la via giudiziale' },
      {
        p: 'Si sceglie quando il debitore non risponde ai solleciti, contesta il credito senza fondamento o è a rischio di insolvenza: ottenere per primi un titolo esecutivo può fare la differenza. Serve un credito certo, liquido ed esigibile, provato da documenti (fatture accompagnate da contratti o DDT, assegni, cambiali, riconoscimenti di debito).',
      },
      { h2: 'Le fasi principali' },
      {
        li: [
          'Ricorso per decreto ingiuntivo (il giudice ordina il pagamento entro 40 giorni)',
          'Notifica del decreto e attesa dell’eventuale opposizione',
          'Atto di precetto: intimazione formale a pagare entro 10 giorni',
          'Pignoramento: presso terzi (conto, stipendio), mobiliare o immobiliare',
          'Assegnazione o vendita forzata e distribuzione del ricavato',
        ],
      },
      {
        p: 'Le agenzie di recupero crediti non svolgono direttamente l’attività giudiziale, riservata agli avvocati: lavorano con legali convenzionati e curano la parte investigativa (rintraccio del debitore, individuazione di conti e beni pignorabili), che è spesso decisiva per il buon esito dell’esecuzione.',
      },
    ],
    faq: [
      {
        question: 'Quanto costa un decreto ingiuntivo?',
        answer:
          'Tra contributo unificato, marca da bollo e compenso del legale, l’ordine di grandezza va da poche centinaia di euro per crediti piccoli a oltre mille euro per crediti rilevanti. Le spese legali vengono poste a carico del debitore nel decreto.',
      },
      {
        question: 'Quanto tempo richiede il recupero giudiziale?',
        answer:
          'Il decreto ingiuntivo si ottiene in genere in 1-3 mesi. Se il debitore non si oppone e ha beni aggredibili, il pignoramento presso terzi può chiudersi in 6-12 mesi. Opposizioni o esecuzioni immobiliari allungano molto i tempi.',
      },
      {
        question: 'Conviene fare causa per un credito piccolo?',
        answer:
          'Sotto qualche migliaio di euro spesso no: meglio esaurire la via stragiudiziale. Un’agenzia seria valuta prima la solvibilità del debitore, per evitare di spendere in una causa contro un debitore nullatenente.',
      },
    ],
    metaTitle: 'Recupero crediti giudiziale: decreto ingiuntivo, precetto, pignoramento',
    metaDescription:
      'Come funziona il recupero crediti per via legale: fasi, tempi e costi di decreto ingiuntivo e pignoramento. Trova agenzie e legali specializzati.',
  },
  {
    name: 'Recupero crediti commerciali B2B',
    slug: 'recupero-crediti-commerciali-b2b',
    order: 3,
    shortDescription:
      'Fatture non pagate tra aziende: gestione professionale dell’insoluto commerciale, dal sollecito alla tutela legale, preservando la relazione con il cliente.',
    paragraphs: [
      {
        p: 'Il recupero crediti commerciali B2B riguarda le fatture insolute tra imprese: forniture di merce, servizi, subappalti, canoni. È l’area più rilevante del recupero crediti in Italia, dove i tempi medi di pagamento restano tra i più lunghi d’Europa.',
      },
      { h2: 'Perché affidarsi a un’agenzia specializzata' },
      {
        p: 'Un credito commerciale perde valore con il passare del tempo: dopo un anno dall’insoluto le probabilità di incasso calano drasticamente. Le agenzie specializzate in B2B combinano phone collection professionale, conoscenza delle dinamiche di settore e informazioni commerciali aggiornate per stimare subito la recuperabilità e agire di conseguenza.',
      },
      { h2: 'Cosa comprende il servizio' },
      {
        li: [
          'Valutazione preventiva della solvibilità del debitore (visure, bilanci, protesti)',
          'Sollecito graduale che tutela la relazione commerciale',
          'Diffide legali e negoziazione di piani di rientro',
          'Gestione di portafogli di crediti insoluti per aziende con molti clienti',
          'Passaggio alla fase giudiziale con legali specializzati in diritto commerciale',
        ],
      },
      {
        p: 'Molte agenzie offrono anche servizi preventivi: valutazione fidi dei nuovi clienti, monitoraggio del portafoglio e recupero “precontenzioso” integrato nei processi di fatturazione dell’azienda.',
      },
    ],
    faq: [
      {
        question: 'Dopo quanto tempo conviene passare la fattura a un’agenzia?',
        answer:
          'La prassi consiglia di non superare i 90-120 giorni dalla scadenza con i soli solleciti interni. Prima si affida la pratica, più alta è la probabilità di recupero.',
      },
      {
        question: 'Il debitore deve pagare anche gli interessi di mora?',
        answer:
          'Sì: nelle transazioni commerciali tra imprese si applicano automaticamente gli interessi di mora del D.Lgs. 231/2002 (tasso BCE maggiorato di 8 punti), oltre a un indennizzo forfettario di 40 € per i costi di recupero.',
      },
    ],
    metaTitle: 'Recupero crediti commerciali B2B: fatture non pagate tra aziende',
    metaDescription:
      'Recupero fatture insolute tra imprese: come funziona, interessi di mora D.Lgs. 231/2002, agenzie specializzate nel credito commerciale B2B.',
  },
  {
    name: 'Recupero crediti verso privati',
    slug: 'recupero-crediti-verso-privati',
    order: 4,
    shortDescription:
      'Crediti verso persone fisiche: rate non pagate, prestiti tra privati, compensi professionali, canoni. Recupero nel rispetto delle norme a tutela del consumatore.',
    paragraphs: [
      {
        p: 'Il recupero crediti verso privati riguarda i crediti vantati nei confronti di persone fisiche: rate di finanziamenti, canoni di affitto, spese condominiali, compensi professionali, prestiti personali, rette scolastiche o sanitarie non pagate.',
      },
      { h2: 'Le particolarità del recupero verso persone fisiche' },
      {
        p: 'Il recupero verso privati richiede attenzione particolare: la normativa a tutela del consumatore e le regole del Garante Privacy vietano pratiche aggressive, contatti a orari inopportuni o comunicazioni a terzi (familiari, datori di lavoro). Le agenzie professionali operano nel pieno rispetto di questi limiti, con approccio fermo ma corretto.',
      },
      { h2: 'Strumenti tipici' },
      {
        li: [
          'Rintraccio anagrafico e verifica della situazione reddituale e patrimoniale',
          'Solleciti telefonici e scritti conformi alle linee guida del Garante',
          'Negoziazione di piani di rientro sostenibili',
          'Pignoramento dello stipendio o della pensione (nei limiti di legge) in fase giudiziale',
        ],
      },
      {
        p: 'La valutazione preventiva è ancora più importante che nel B2B: agire legalmente contro un debitore privo di reddito o beni produce solo costi. Un’agenzia seria lo dice subito, prima di aprire la pratica.',
      },
    ],
    faq: [
      {
        question: 'Quanto si può pignorare dello stipendio di un privato?',
        answer:
          'In generale fino a un quinto (20%) dello stipendio o della pensione netta, con limiti più stringenti per le pensioni basse. Con più pignoramenti concorrenti si arriva al massimo alla metà.',
      },
      {
        question: 'L’agenzia può contattare i familiari del debitore?',
        answer:
          'No: comunicare a terzi l’esistenza del debito viola la privacy del debitore. Le agenzie professionali contattano esclusivamente il diretto interessato.',
      },
    ],
    metaTitle: 'Recupero crediti verso privati: come funziona e limiti di legge',
    metaDescription:
      'Recupero crediti verso persone fisiche: affitti, rate, compensi. Regole del Garante, pignoramento stipendio e agenzie specializzate.',
  },
  {
    name: 'Recupero crediti internazionale',
    slug: 'recupero-crediti-internazionale',
    order: 5,
    shortDescription:
      'Clienti esteri che non pagano: recupero crediti transfrontaliero con reti di corrispondenti, ingiunzione di pagamento europea e conoscenza delle normative locali.',
    paragraphs: [
      {
        p: 'Il recupero crediti internazionale riguarda i crediti verso debitori con sede all’estero, tipicamente nati da forniture export. Richiede competenze specifiche: lingue, normative locali, prassi commerciali diverse e strumenti giudiziari transfrontalieri.',
      },
      { h2: 'Come si recupera un credito all’estero' },
      {
        p: 'La fase stragiudiziale funziona come in Italia ma viene svolta da corrispondenti locali che parlano la lingua del debitore e ne conoscono il contesto: un sollecito che arriva da un’agenzia del posto ha molta più efficacia. Per la fase giudiziale, nell’UE esistono strumenti dedicati come l’ingiunzione di pagamento europea (regolamento CE 1896/2006) e il procedimento europeo per le controversie di modesta entità.',
      },
      { h2: 'Cosa valutare prima di affidare la pratica' },
      {
        li: [
          'Presenza dell’agenzia (diretta o tramite partner) nel Paese del debitore',
          'Esperienza nel settore merceologico e nelle clausole contrattuali export',
          'Trasparenza su costi, tempi attesi e legge applicabile al contratto',
          'Capacità di gestire documenti e contenzioso in lingua',
        ],
      },
    ],
    faq: [
      {
        question: 'Vale la pena recuperare un credito estero di piccolo importo?',
        answer:
          'Nell’UE sì, grazie al procedimento per controversie di modesta entità (fino a 5.000 €) che è rapido ed economico. Fuori dall’UE i costi salgono e conviene valutare caso per caso con l’agenzia.',
      },
      {
        question: 'Quali Paesi sono più difficili per il recupero crediti?',
        answer:
          'In generale il recupero è più complesso dove i tempi giudiziari sono lunghi o le informazioni patrimoniali poco accessibili. Un’agenzia con corrispondenti locali sa indicare subito le probabilità di successo Paese per Paese.',
      },
    ],
    metaTitle: 'Recupero crediti internazionale: clienti esteri che non pagano',
    metaDescription:
      'Recupero crediti all’estero: ingiunzione europea, corrispondenti locali, costi e tempi. Agenzie specializzate nel recupero internazionale.',
  },
  {
    name: 'Cessione del credito e NPL',
    slug: 'cessione-del-credito-npl',
    order: 6,
    shortDescription:
      'Vendere il credito invece di recuperarlo: cessione pro soluto e pro solvendo, acquisto di crediti deteriorati (NPL) e liquidità immediata per l’azienda.',
    paragraphs: [
      {
        p: 'Con la cessione del credito l’azienda vende il proprio credito insoluto a un soggetto terzo, incassando subito una percentuale del valore nominale e liberandosi del rischio e dei costi di recupero. I crediti deteriorati ceduti in blocco sono i cosiddetti NPL (non-performing loans).',
      },
      { h2: 'Pro soluto e pro solvendo' },
      {
        p: 'Nella cessione pro soluto il rischio di mancato incasso passa interamente all’acquirente: il cedente incassa e chiude. Nella cessione pro solvendo il cedente resta responsabile se il debitore non paga. Il prezzo riflette il rischio: un credito fresco e documentato vale una percentuale molto più alta di un credito vecchio o contestato.',
      },
      { h2: 'Quando conviene cedere il credito' },
      {
        li: [
          'Quando serve liquidità immediata e certa',
          'Quando il credito è vecchio e il recupero diretto è improbabile o antieconomico',
          'Quando si vuole pulire il bilancio da posizioni deteriorate',
          'Per portafogli di molti piccoli crediti, dove la gestione singola non conviene',
        ],
      },
      {
        p: 'La cessione richiede la notifica al debitore ceduto ed è regolata dagli artt. 1260 e seguenti del Codice civile. Gli operatori che acquistano crediti in modo professionale devono possedere le autorizzazioni previste (art. 115 TULPS o, per gli NPL bancari, la disciplina dedicata).',
      },
    ],
    faq: [
      {
        question: 'Quanto vale un credito in cessione?',
        answer:
          'Dipende da anzianità, documentazione e solvibilità del debitore: si va da pochi punti percentuali per NPL vecchi a percentuali significative per crediti recenti verso debitori solidi. La valutazione è gratuita presso la maggior parte degli operatori.',
      },
      {
        question: 'Serve il consenso del debitore per cedere il credito?',
        answer:
          'No: la cessione è efficace senza il consenso del debitore, salvo patto contrario. Va però notificata al debitore, che da quel momento paga validamente solo al nuovo creditore.',
      },
    ],
    metaTitle: 'Cessione del credito e NPL: vendere i crediti insoluti',
    metaDescription:
      'Cessione del credito pro soluto e pro solvendo, vendita NPL: come funziona, quanto vale un credito, operatori specializzati in Italia.',
  },
  {
    name: 'Recupero canoni di locazione e condominiali',
    slug: 'recupero-canoni-locazione-condominiali',
    order: 7,
    shortDescription:
      'Affitti non pagati e morosità condominiali: dallo sfratto per morosità al recupero delle spese, con agenzie e legali specializzati nel settore immobiliare.',
    paragraphs: [
      {
        p: 'Il mancato pagamento di canoni di locazione e spese condominiali è tra le cause più frequenti di contenzioso immobiliare in Italia. Il recupero richiede procedure specifiche: lo sfratto per morosità per i canoni di affitto e il decreto ingiuntivo immediatamente esecutivo per le quote condominiali.',
      },
      { h2: 'Affitti non pagati: come agire' },
      {
        p: 'Dopo i primi solleciti, il proprietario può avviare lo sfratto per morosità: già con una mensilità non pagata (per gli immobili abitativi) è possibile intimare lo sfratto e citare l’inquilino per la convalida. La procedura porta sia alla riconsegna dell’immobile sia a un titolo per recuperare i canoni arretrati.',
      },
      { h2: 'Morosità condominiali' },
      {
        p: 'L’amministratore è obbligato ad agire per il recupero delle quote entro sei mesi dalla chiusura dell’esercizio. Il condominio ottiene dal giudice un decreto ingiuntivo immediatamente esecutivo sulla base del riparto approvato dall’assemblea: uno strumento rapido che consente di procedere subito al pignoramento.',
      },
      {
        li: [
          'Solleciti e diffide mirate prima dell’azione legale',
          'Verifica preventiva di redditi e beni dell’inquilino o del condomino moroso',
          'Sfratto per morosità e recupero dei canoni arretrati',
          'Decreto ingiuntivo ex art. 63 disp. att. c.c. per le spese condominiali',
        ],
      },
    ],
    faq: [
      {
        question: 'Dopo quante mensilità si può sfrattare un inquilino?',
        answer:
          'Per le locazioni abitative basta una sola mensilità non pagata oltre 20 giorni dalla scadenza. Per gli usi commerciali si valuta la gravità dell’inadempimento secondo il contratto.',
      },
      {
        question: 'Chi paga le spese del recupero della morosità condominiale?',
        answer:
          'Le spese legali del decreto ingiuntivo vengono poste a carico del condomino moroso. In attesa del recupero, l’assemblea può dover anticipare le somme per non bloccare i servizi.',
      },
    ],
    metaTitle: 'Recupero affitti non pagati e morosità condominiali',
    metaDescription:
      'Sfratto per morosità, decreto ingiuntivo per spese condominiali: procedure, tempi e specialisti del recupero crediti immobiliare.',
  },
  {
    name: 'Informazioni commerciali e visure',
    slug: 'informazioni-commerciali-visure',
    order: 8,
    shortDescription:
      'Conoscere il debitore prima di agire: report di solvibilità, rintraccio anagrafico, indagini patrimoniali e visure per decidere se e come recuperare.',
    paragraphs: [
      {
        p: 'Le informazioni commerciali sono il supporto investigativo del recupero crediti: report sulla solvibilità di aziende e persone, rintraccio di debitori irreperibili, individuazione di conti correnti, rapporti di lavoro e beni pignorabili. Servono a decidere se agire, con quale strumento e con quali probabilità di successo.',
      },
      { h2: 'I servizi principali' },
      {
        li: [
          'Report impresa: visura camerale, bilanci, protesti, pregiudizievoli, affidabilità',
          'Report persona: residenza effettiva, occupazione, capacità reddituale',
          'Rintraccio debitore: nuova residenza o sede di debitori irreperibili',
          'Indagini patrimoniali pre-esecuzione: conti, stipendi, immobili, veicoli',
        ],
      },
      { h2: 'Perché sono decisive' },
      {
        p: 'Un recupero avviato alla cieca spreca tempo e denaro: la spesa di poche decine di euro per un report può evitare una causa da migliaia di euro contro un debitore nullatenente, oppure indirizzare subito il pignoramento sul bene giusto. Le agenzie autorizzate (licenza ex art. 134 TULPS per le investigazioni) operano nel rispetto del GDPR e delle finalità di tutela del credito.',
      },
    ],
    faq: [
      {
        question: 'È legale far indagare sul patrimonio di un debitore?',
        answer:
          'Sì, se l’indagine è svolta da operatori autorizzati per la finalità legittima di tutela del credito e nel rispetto del GDPR. Sono invece vietate intrusioni illecite (es. accessi abusivi a banche dati riservate).',
      },
      {
        question: 'Quanto costa un report di solvibilità?',
        answer:
          'I report standard su imprese partono da poche decine di euro; le indagini patrimoniali complete pre-pignoramento costano di più, in funzione della profondità della ricerca.',
      },
    ],
    metaTitle: 'Informazioni commerciali e indagini patrimoniali sui debitori',
    metaDescription:
      'Report di solvibilità, rintraccio debitori, indagini patrimoniali pre-pignoramento: come funzionano e quanto costano. Operatori autorizzati.',
  },
]
