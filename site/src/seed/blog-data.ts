/** Tre guide seed (asset SEO+GEO fin dal lancio). */

export type PostSeed = {
  title: string
  slug: string
  excerpt: string
  paragraphs: ({ h2: string } | { h3: string } | { p: string } | { li: string[] })[]
  tags: string[]
  faq: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
}

export const posts: PostSeed[] = [
  {
    title: 'Come recuperare un credito da un cliente che non paga: guida completa',
    slug: 'come-recuperare-credito-cliente-non-paga',
    excerpt:
      'Fattura scaduta e cliente che non risponde? La procedura passo passo: sollecito, diffida, agenzia di recupero o azione legale. Cosa fare, in che ordine e quanto costa.',
    paragraphs: [
      {
        p: 'Un credito non incassato è un problema doppio: manca la liquidità e si rischia di perdere anche il tempo dedicato a inseguire il pagamento. La buona notizia è che esiste un percorso collaudato, dal sollecito bonario all’azione legale. Questa guida lo percorre passo per passo.',
      },
      { h2: '1. Verifica il credito prima di agire' },
      {
        p: 'Un credito si recupera bene se è certo (esiste ed è documentato), liquido (importo determinato) ed esigibile (scaduto e non contestato). Raccogli fattura, contratto o ordine, documenti di trasporto, email di riconoscimento del debito. Più il fascicolo è solido, più veloce sarà ogni fase successiva.',
      },
      { h2: '2. Il sollecito bonario' },
      {
        p: 'Il primo sollecito conviene farlo in modo cordiale ma tracciabile: una email con la fattura allegata e un termine chiaro (es. 7 giorni). Se non arriva risposta, seguono un secondo sollecito scritto e una telefonata. Spesso l’insoluto nasce da disorganizzazione, non da malafede: il tono fermo ma professionale preserva il rapporto commerciale.',
      },
      { h2: '3. La diffida ad adempiere' },
      {
        p: 'Se i solleciti non bastano, la lettera di diffida — inviata via PEC o raccomandata A/R, meglio se a firma di un legale o di un’agenzia — costituisce in mora il debitore, interrompe la prescrizione e comunica che la prossima mossa sarà giudiziale. Una diffida ben scritta risolve da sola una quota significativa delle pratiche.',
      },
      { h2: '4. Agenzia di recupero crediti o avvocato?' },
      {
        li: [
          'L’agenzia conviene per la fase stragiudiziale: lavora a provvigione sul recuperato, ha strutture di phone collection e conosce le tecniche di negoziazione.',
          'L’avvocato è obbligatorio per la fase giudiziale (decreto ingiuntivo, pignoramento).',
          'La soluzione migliore è spesso combinata: agenzia per il bonario, legale convenzionato se serve il tribunale.',
        ],
      },
      { h2: '5. L’azione legale' },
      {
        p: 'Con un credito documentato si chiede il decreto ingiuntivo: il giudice ordina il pagamento entro 40 giorni. Senza opposizione, il decreto diventa esecutivo e si può procedere con precetto e pignoramento. Prima di investire in una causa, però, verifica sempre la solvibilità del debitore con un’indagine patrimoniale: vincere contro un nullatenente non porta a nulla.',
      },
      { h2: 'Tempi e costi in sintesi' },
      {
        li: [
          'Sollecito e diffida: 2-6 settimane, costi minimi',
          'Recupero stragiudiziale con agenzia: 1-3 mesi, provvigione 5-20% sul recuperato',
          'Decreto ingiuntivo: 1-3 mesi, da alcune centinaia di euro (recuperabili dal debitore)',
          'Pignoramento: 6-18 mesi a seconda del bene aggredito',
        ],
      },
    ],
    tags: ['guida', 'stragiudiziale', 'diffida', 'decreto ingiuntivo'],
    faq: [
      {
        question: 'Dopo quanto tempo un credito va in prescrizione?',
        answer:
          'Il termine ordinario è 10 anni; per molte prestazioni professionali e commerciali esistono prescrizioni brevi (es. 3 anni per i professionisti, 1 anno per trasporti e spedizioni). Ogni diffida scritta interrompe la prescrizione e fa ripartire il conteggio.',
      },
      {
        question: 'Conviene rivolgersi subito a un avvocato?',
        answer:
          'Per la maggior parte dei crediti commerciali conviene prima esaurire la via stragiudiziale tramite agenzia, che costa solo a risultato. L’avvocato diventa necessario se il debitore contesta il credito o ignora la diffida.',
      },
      {
        question: 'Il debitore deve rimborsare i costi del recupero?',
        answer:
          'Nelle transazioni tra imprese sì: il D.Lgs. 231/2002 riconosce interessi di mora automatici e un indennizzo minimo di 40 € per i costi di recupero, oltre alle spese legali liquidate nel decreto ingiuntivo.',
      },
    ],
    metaTitle: 'Come recuperare un credito da un cliente che non paga (guida 2026)',
    metaDescription:
      'Guida passo passo al recupero crediti: sollecito, diffida, agenzia o avvocato, decreto ingiuntivo. Tempi, costi e consigli pratici.',
  },
  {
    title: 'Agenzia di recupero crediti: quanto costa davvero e come scegliere quella giusta',
    slug: 'quanto-costa-agenzia-recupero-crediti',
    excerpt:
      'Provvigioni, costi fissi, percentuali sul recuperato: capire i prezzi delle agenzie di recupero crediti e i criteri per scegliere un partner serio ed evitare brutte sorprese.',
    paragraphs: [
      {
        p: 'Quanto costa affidare un credito a un’agenzia di recupero? La risposta onesta è: dipende da importo, anzianità del credito e tipo di debitore. Ma i modelli di prezzo sono pochi e conoscerli mette al riparo dalle sorprese.',
      },
      { h2: 'I modelli di prezzo più diffusi' },
      {
        li: [
          'Success fee pura: l’agenzia trattiene una percentuale solo su quanto effettivamente recuperato. È il modello più comune e più sano: interessi allineati.',
          'Fisso + success fee: un contributo di apertura pratica (decine di euro) più una provvigione ridotta.',
          'Canone per portafogli: per aziende che affidano flussi continui di pratiche, si negozia un listino dedicato.',
        ],
      },
      { h2: 'Quanto incide la provvigione' },
      {
        p: 'Le percentuali tipiche vanno dal 5% al 20% per crediti commerciali recenti e ben documentati, e possono salire oltre il 30% per crediti vecchi, piccoli o verso debitori difficili. Diffida di chi promette percentuali bassissime su crediti difficili: spesso significa che la pratica verrà lavorata poco.',
      },
      { h2: 'Come riconoscere un’agenzia seria' },
      {
        li: [
          'Licenza ex art. 115 TULPS esposta e verificabile in Questura',
          'Contratto scritto chiaro: percentuali, costi fissi, durata del mandato, reportistica',
          'Nessuna richiesta di anticipi sproporzionati prima di iniziare',
          'Valutazione preliminare gratuita della recuperabilità',
          'Rispetto delle regole del Garante Privacy nel contatto con i debitori',
        ],
      },
      { h2: 'Le domande da fare prima di firmare' },
      {
        p: 'Chi seguirà la mia pratica? Con che frequenza ricevo aggiornamenti? Cosa succede se il debitore non paga: mi proponete la via legale e a che costi? La qualità delle risposte vale più di qualsiasi percentuale.',
      },
    ],
    tags: ['costi', 'agenzie', 'guida'],
    faq: [
      {
        question: 'Le agenzie di recupero crediti chiedono soldi in anticipo?',
        answer:
          'Le agenzie serie al massimo chiedono un piccolo contributo di apertura pratica. La parte principale del compenso è sempre una percentuale su quanto recuperato. Anticipi elevati senza garanzie sono un campanello d’allarme.',
      },
      {
        question: 'Che differenza c’è tra agenzia con licenza e senza?',
        answer:
          'L’attività di recupero crediti per conto terzi richiede la licenza del Questore ex art. 115 TULPS. Un operatore senza licenza lavora illegalmente: verifica sempre prima di affidare una pratica.',
      },
    ],
    metaTitle: 'Quanto costa un’agenzia di recupero crediti: prezzi e criteri di scelta',
    metaDescription:
      'Success fee, costi fissi, percentuali sul recuperato: i prezzi reali delle agenzie di recupero crediti e come scegliere un partner affidabile.',
  },
  {
    title: 'Decreto ingiuntivo: cos’è, quando serve e come funziona passo passo',
    slug: 'decreto-ingiuntivo-come-funziona',
    excerpt:
      'Il decreto ingiuntivo è lo strumento legale più usato per recuperare crediti documentati: requisiti, procedura, tempi, costi e cosa succede dopo la notifica.',
    paragraphs: [
      {
        p: 'Il decreto ingiuntivo (artt. 633 e seguenti del Codice di procedura civile) è un provvedimento con cui il giudice ordina al debitore di pagare una somma entro 40 giorni, sulla base della sola documentazione presentata dal creditore. È lo strumento giudiziale più rapido ed economico per i crediti documentati.',
      },
      { h2: 'Quando si può chiedere' },
      {
        p: 'Serve una prova scritta del credito: fatture accompagnate dall’estratto autentico delle scritture contabili, contratti firmati, assegni o cambiali, riconoscimenti di debito, saldaconti bancari. Il credito deve essere certo, liquido ed esigibile.',
      },
      { h2: 'La procedura passo passo' },
      {
        li: [
          'Il legale deposita il ricorso al tribunale competente con i documenti',
          'Il giudice emette il decreto, di norma entro 30-60 giorni',
          'Il decreto viene notificato al debitore, che ha 40 giorni per pagare o fare opposizione',
          'Senza opposizione, il decreto diventa definitivamente esecutivo',
          'Con il decreto esecutivo si notifica il precetto e si procede al pignoramento',
        ],
      },
      { h2: 'La provvisoria esecuzione' },
      {
        p: 'In alcuni casi (credito fondato su assegno o cambiale, riconoscimento di debito, pericolo nel ritardo) il giudice concede la provvisoria esecuzione immediata: si può pignorare senza aspettare i 40 giorni. Anche il decreto per spese condominiali è immediatamente esecutivo per legge.',
      },
      { h2: 'E se il debitore fa opposizione?' },
      {
        p: 'L’opposizione apre una causa ordinaria che può durare anni. Per questo conviene arrivare al decreto con un fascicolo solido: opposizioni pretestuose contro crediti ben documentati vengono respinte, spesso con condanna alle spese. Una valutazione preventiva seria riduce il rischio di opposizione fondata.',
      },
    ],
    tags: ['giudiziale', 'decreto ingiuntivo', 'guida'],
    faq: [
      {
        question: 'Quanto costa fare un decreto ingiuntivo?',
        answer:
          'Il contributo unificato dipende dal valore della causa (da ~50 € a diverse centinaia). A questo si aggiunge il compenso del legale. Le spese vengono liquidate nel decreto a carico del debitore.',
      },
      {
        question: 'Il decreto ingiuntivo funziona anche se il debitore è nullatenente?',
        answer:
          'Il decreto si ottiene comunque, ma senza beni o redditi da pignorare resta sulla carta. Per questo prima di agire conviene un’indagine patrimoniale: se il debitore è incapiente, meglio valutare la cessione del credito o attendere tempi migliori (il titolo si prescrive in 10 anni).',
      },
      {
        question: 'Posso fare da solo un decreto ingiuntivo senza avvocato?',
        answer:
          'Solo per crediti fino a 1.100 € davanti al Giudice di Pace è possibile stare in giudizio personalmente. Sopra questa soglia serve un avvocato.',
      },
    ],
    metaTitle: 'Decreto ingiuntivo: come funziona, tempi, costi e opposizione',
    metaDescription:
      'Guida completa al decreto ingiuntivo: requisiti, procedura passo passo, provvisoria esecuzione, costi e cosa fare in caso di opposizione.',
  },
]
