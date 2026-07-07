/** Dati geografici: 20 regioni + 107 province (capoluoghi) con coordinate. */

export type RegionSeed = {
  name: string
  slug: string
  lat: number
  lng: number
  description: string
}

export type ProvinceSeed = {
  name: string
  slug: string
  region: string // slug della regione
  lat: number
  lng: number
}

export const regions: RegionSeed[] = [
  {
    name: 'Abruzzo',
    slug: 'abruzzo',
    lat: 42.35,
    lng: 13.4,
    description:
      'In Abruzzo il tessuto produttivo unisce piccole imprese manifatturiere, turismo e agroalimentare tra L’Aquila, Pescara, Chieti e Teramo. Le agenzie di recupero crediti attive nella regione assistono aziende e privati nella gestione di insoluti commerciali e canoni non pagati, operando sia in via stragiudiziale sia con il supporto di legali convenzionati.',
  },
  {
    name: 'Basilicata',
    slug: 'basilicata',
    lat: 40.5,
    lng: 16.08,
    description:
      'Tra Potenza e Matera la Basilicata ospita realtà industriali, agricole e turistiche in crescita. Le agenzie di recupero crediti presenti sul territorio lucano seguono principalmente crediti commerciali B2B e insoluti verso privati, con una conoscenza diretta del contesto economico locale che accelera la fase bonaria del recupero.',
  },
  {
    name: 'Calabria',
    slug: 'calabria',
    lat: 39.05,
    lng: 16.52,
    description:
      'La Calabria, da Reggio Calabria a Cosenza e Catanzaro, presenta un’economia fatta di commercio, agricoltura e servizi. Il recupero crediti nella regione richiede spesso un presidio locale: le agenzie del territorio conoscono i tempi dei tribunali calabresi e privilegiano soluzioni stragiudiziali rapide prima di passare alla via legale.',
  },
  {
    name: 'Campania',
    slug: 'campania',
    lat: 40.86,
    lng: 14.28,
    description:
      'Con Napoli, Salerno e Caserta, la Campania è la principale economia del Sud Italia: commercio, logistica portuale, agroalimentare e manifattura generano un volume elevato di transazioni e, di conseguenza, di crediti insoluti. Le agenzie campane offrono recupero stragiudiziale e giudiziale sia per aziende sia per privati, con reti di esattori sul territorio.',
  },
  {
    name: 'Emilia-Romagna',
    slug: 'emilia-romagna',
    lat: 44.49,
    lng: 11.34,
    description:
      'L’Emilia-Romagna è una delle regioni più industrializzate d’Italia: meccanica, packaging, agroalimentare e ceramica tra Bologna, Modena, Parma e Reggio Emilia. Le agenzie di recupero crediti emiliane sono specializzate nei crediti commerciali B2B e nella gestione professionale del credito d’impresa, spesso con servizi di informazioni commerciali integrati.',
  },
  {
    name: 'Friuli-Venezia Giulia',
    slug: 'friuli-venezia-giulia',
    lat: 46.06,
    lng: 13.24,
    description:
      'Regione di confine con forte vocazione all’export, il Friuli-Venezia Giulia unisce l’industria di Udine e Pordenone al porto di Trieste. Le agenzie locali gestiscono con frequenza crediti transfrontalieri verso Austria, Slovenia e Est Europa, oltre ai tradizionali insoluti commerciali del manifatturiero.',
  },
  {
    name: 'Lazio',
    slug: 'lazio',
    lat: 41.89,
    lng: 12.49,
    description:
      'Il Lazio, con Roma al centro, concentra pubblica amministrazione, servizi, immobiliare e terziario avanzato. Le agenzie di recupero crediti laziali trattano un ampio spettro di pratiche: canoni di locazione non pagati, insoluti condominiali, crediti professionali e commerciali, con accesso diretto ai principali fori della Capitale.',
  },
  {
    name: 'Liguria',
    slug: 'liguria',
    lat: 44.41,
    lng: 8.93,
    description:
      'Tra il porto di Genova, il turismo delle riviere e la logistica di La Spezia e Savona, la Liguria genera crediti commerciali legati a trasporti, nautica e servizi. Le agenzie liguri di recupero crediti affiancano PMI e armatori nella gestione degli insoluti, con esperienza specifica nel settore marittimo e turistico.',
  },
  {
    name: 'Lombardia',
    slug: 'lombardia',
    lat: 45.47,
    lng: 9.19,
    description:
      'La Lombardia è il cuore economico d’Italia: Milano e le province di Brescia, Bergamo e Monza producono da sole una quota rilevante del PIL nazionale. Qui opera il maggior numero di agenzie di recupero crediti del Paese, con competenze che spaziano dal sollecito stragiudiziale al contenzioso giudiziale, dai crediti bancari agli NPL, fino al recupero internazionale.',
  },
  {
    name: 'Marche',
    slug: 'marche',
    lat: 43.62,
    lng: 13.51,
    description:
      'Le Marche, terra di distretti manifatturieri (calzature, mobile, meccanica) tra Ancona, Pesaro e Macerata, esprimono una forte domanda di tutela del credito B2B. Le agenzie marchigiane lavorano a stretto contatto con le PMI dei distretti, privilegiando il recupero bonario per preservare le relazioni commerciali.',
  },
  {
    name: 'Molise',
    slug: 'molise',
    lat: 41.56,
    lng: 14.66,
    description:
      'Il Molise, tra Campobasso e Isernia, ha un’economia di piccole imprese, agricoltura e servizi. Le agenzie di recupero crediti che coprono la regione operano spesso anche sulle regioni limitrofe, garantendo comunque presenza sul territorio per solleciti, verifiche patrimoniali e recupero domiciliare.',
  },
  {
    name: 'Piemonte',
    slug: 'piemonte',
    lat: 45.07,
    lng: 7.69,
    description:
      'Il Piemonte unisce la tradizione industriale di Torino (automotive, aerospazio) ai distretti tessili e alimentari di Biella, Cuneo e Asti. Le agenzie di recupero crediti piemontesi assistono l’industria e l’indotto nella gestione di insoluti B2B, oltre a seguire crediti verso privati e condominiali nei centri urbani.',
  },
  {
    name: 'Puglia',
    slug: 'puglia',
    lat: 41.12,
    lng: 16.87,
    description:
      'La Puglia, da Bari a Lecce e Taranto, cresce su agroalimentare, turismo e industria. Il recupero crediti nella regione copre insoluti commerciali, canoni di locazione turistica e crediti verso privati; le agenzie pugliesi combinano phone collection centralizzata e rete di esattori domiciliari sul territorio.',
  },
  {
    name: 'Sardegna',
    slug: 'sardegna',
    lat: 39.22,
    lng: 9.1,
    description:
      'In Sardegna l’economia ruota attorno a turismo, servizi e agropastorale, con Cagliari e Sassari come poli principali. L’insularità rende prezioso il presidio locale: le agenzie sarde di recupero crediti gestiscono direttamente solleciti, verifiche e incassi senza costi di trasferta dal continente.',
  },
  {
    name: 'Sicilia',
    slug: 'sicilia',
    lat: 38.12,
    lng: 13.36,
    description:
      'La Sicilia, con Palermo e Catania in testa, è la più grande regione del Mezzogiorno: commercio, edilizia, agroalimentare e turismo generano un contenzioso da crediti significativo. Le agenzie siciliane operano su tutto il territorio isolano con reti capillari di esattori e rapporti consolidati con i fori locali.',
  },
  {
    name: 'Toscana',
    slug: 'toscana',
    lat: 43.77,
    lng: 11.25,
    description:
      'Tra Firenze, Prato e i distretti della pelle e del tessile, la Toscana unisce manifattura d’eccellenza, turismo e artigianato. Le agenzie di recupero crediti toscane sono abituate a trattare sia crediti B2B dei distretti industriali sia insoluti del comparto turistico-ricettivo e immobiliare.',
  },
  {
    name: 'Trentino-Alto Adige',
    slug: 'trentino-alto-adige',
    lat: 46.07,
    lng: 11.12,
    description:
      'Il Trentino-Alto Adige, tra Trento e Bolzano, vanta un’economia solida: turismo alpino, agricoltura di qualità e manifattura export-oriented. Le agenzie del territorio gestiscono crediti commerciali anche verso l’area germanofona (Austria e Germania), con servizi bilingui italiano-tedesco.',
  },
  {
    name: 'Umbria',
    slug: 'umbria',
    lat: 43.11,
    lng: 12.39,
    description:
      'L’Umbria, con Perugia e Terni, ospita PMI manifatturiere, agroalimentare e servizi. Le agenzie di recupero crediti umbre seguono con approccio diretto e personale gli insoluti delle imprese locali, dalla diffida stragiudiziale al decreto ingiuntivo presso i tribunali di Perugia, Terni e Spoleto.',
  },
  {
    name: 'Valle d’Aosta',
    slug: 'valle-d-aosta',
    lat: 45.74,
    lng: 7.32,
    description:
      'La Valle d’Aosta, la più piccola regione italiana, vive di turismo alpino, energia e artigianato. Le pratiche di recupero crediti — spesso legate a forniture, canoni e servizi turistici — vengono seguite da agenzie con copertura regionale e dalla vicina area piemontese, con possibilità di gestione bilingue italiano-francese.',
  },
  {
    name: 'Veneto',
    slug: 'veneto',
    lat: 45.44,
    lng: 12.32,
    description:
      'Il Veneto è una potenza manifatturiera ed esportatrice: meccanica, moda, occhialeria e vino tra Verona, Padova, Treviso e Vicenza. Le agenzie di recupero crediti venete sono tra le più strutturate d’Italia sul credito commerciale B2B e sul recupero internazionale legato all’export dei distretti.',
  },
]

export const provinces: ProvinceSeed[] = [
  // Piemonte
  { name: 'Torino', slug: 'torino', region: 'piemonte', lat: 45.07, lng: 7.69 },
  { name: 'Alessandria', slug: 'alessandria', region: 'piemonte', lat: 44.91, lng: 8.62 },
  { name: 'Asti', slug: 'asti', region: 'piemonte', lat: 44.9, lng: 8.21 },
  { name: 'Biella', slug: 'biella', region: 'piemonte', lat: 45.57, lng: 8.05 },
  { name: 'Cuneo', slug: 'cuneo', region: 'piemonte', lat: 44.38, lng: 7.54 },
  { name: 'Novara', slug: 'novara', region: 'piemonte', lat: 45.45, lng: 8.62 },
  { name: 'Verbano-Cusio-Ossola', slug: 'verbano-cusio-ossola', region: 'piemonte', lat: 45.92, lng: 8.55 },
  { name: 'Vercelli', slug: 'vercelli', region: 'piemonte', lat: 45.32, lng: 8.42 },
  // Valle d'Aosta
  { name: 'Aosta', slug: 'aosta', region: 'valle-d-aosta', lat: 45.74, lng: 7.32 },
  // Lombardia
  { name: 'Milano', slug: 'milano', region: 'lombardia', lat: 45.46, lng: 9.19 },
  { name: 'Bergamo', slug: 'bergamo', region: 'lombardia', lat: 45.7, lng: 9.67 },
  { name: 'Brescia', slug: 'brescia', region: 'lombardia', lat: 45.54, lng: 10.21 },
  { name: 'Como', slug: 'como', region: 'lombardia', lat: 45.81, lng: 9.09 },
  { name: 'Cremona', slug: 'cremona', region: 'lombardia', lat: 45.13, lng: 10.02 },
  { name: 'Lecco', slug: 'lecco', region: 'lombardia', lat: 45.86, lng: 9.4 },
  { name: 'Lodi', slug: 'lodi', region: 'lombardia', lat: 45.31, lng: 9.5 },
  { name: 'Mantova', slug: 'mantova', region: 'lombardia', lat: 45.16, lng: 10.79 },
  { name: 'Monza e Brianza', slug: 'monza-e-brianza', region: 'lombardia', lat: 45.58, lng: 9.27 },
  { name: 'Pavia', slug: 'pavia', region: 'lombardia', lat: 45.19, lng: 9.16 },
  { name: 'Sondrio', slug: 'sondrio', region: 'lombardia', lat: 46.17, lng: 9.87 },
  { name: 'Varese', slug: 'varese', region: 'lombardia', lat: 45.82, lng: 8.83 },
  // Trentino-Alto Adige
  { name: 'Trento', slug: 'trento', region: 'trentino-alto-adige', lat: 46.07, lng: 11.12 },
  { name: 'Bolzano', slug: 'bolzano', region: 'trentino-alto-adige', lat: 46.5, lng: 11.35 },
  // Veneto
  { name: 'Venezia', slug: 'venezia', region: 'veneto', lat: 45.44, lng: 12.32 },
  { name: 'Belluno', slug: 'belluno', region: 'veneto', lat: 46.14, lng: 12.22 },
  { name: 'Padova', slug: 'padova', region: 'veneto', lat: 45.41, lng: 11.88 },
  { name: 'Rovigo', slug: 'rovigo', region: 'veneto', lat: 45.07, lng: 11.79 },
  { name: 'Treviso', slug: 'treviso', region: 'veneto', lat: 45.67, lng: 12.24 },
  { name: 'Verona', slug: 'verona', region: 'veneto', lat: 45.44, lng: 10.99 },
  { name: 'Vicenza', slug: 'vicenza', region: 'veneto', lat: 45.55, lng: 11.55 },
  // Friuli-Venezia Giulia
  { name: 'Trieste', slug: 'trieste', region: 'friuli-venezia-giulia', lat: 45.65, lng: 13.78 },
  { name: 'Gorizia', slug: 'gorizia', region: 'friuli-venezia-giulia', lat: 45.94, lng: 13.62 },
  { name: 'Pordenone', slug: 'pordenone', region: 'friuli-venezia-giulia', lat: 45.96, lng: 12.66 },
  { name: 'Udine', slug: 'udine', region: 'friuli-venezia-giulia', lat: 46.07, lng: 13.23 },
  // Liguria
  { name: 'Genova', slug: 'genova', region: 'liguria', lat: 44.41, lng: 8.93 },
  { name: 'Imperia', slug: 'imperia', region: 'liguria', lat: 43.89, lng: 8.04 },
  { name: 'La Spezia', slug: 'la-spezia', region: 'liguria', lat: 44.1, lng: 9.82 },
  { name: 'Savona', slug: 'savona', region: 'liguria', lat: 44.31, lng: 8.48 },
  // Emilia-Romagna
  { name: 'Bologna', slug: 'bologna', region: 'emilia-romagna', lat: 44.49, lng: 11.34 },
  { name: 'Ferrara', slug: 'ferrara', region: 'emilia-romagna', lat: 44.84, lng: 11.62 },
  { name: 'Forlì-Cesena', slug: 'forli-cesena', region: 'emilia-romagna', lat: 44.22, lng: 12.04 },
  { name: 'Modena', slug: 'modena', region: 'emilia-romagna', lat: 44.65, lng: 10.93 },
  { name: 'Parma', slug: 'parma', region: 'emilia-romagna', lat: 44.8, lng: 10.33 },
  { name: 'Piacenza', slug: 'piacenza', region: 'emilia-romagna', lat: 45.05, lng: 9.7 },
  { name: 'Ravenna', slug: 'ravenna', region: 'emilia-romagna', lat: 44.42, lng: 12.2 },
  { name: 'Reggio Emilia', slug: 'reggio-emilia', region: 'emilia-romagna', lat: 44.7, lng: 10.63 },
  { name: 'Rimini', slug: 'rimini', region: 'emilia-romagna', lat: 44.06, lng: 12.57 },
  // Toscana
  { name: 'Firenze', slug: 'firenze', region: 'toscana', lat: 43.77, lng: 11.25 },
  { name: 'Arezzo', slug: 'arezzo', region: 'toscana', lat: 43.46, lng: 11.88 },
  { name: 'Grosseto', slug: 'grosseto', region: 'toscana', lat: 42.76, lng: 11.11 },
  { name: 'Livorno', slug: 'livorno', region: 'toscana', lat: 43.55, lng: 10.31 },
  { name: 'Lucca', slug: 'lucca', region: 'toscana', lat: 43.84, lng: 10.5 },
  { name: 'Massa-Carrara', slug: 'massa-carrara', region: 'toscana', lat: 44.04, lng: 10.14 },
  { name: 'Pisa', slug: 'pisa', region: 'toscana', lat: 43.72, lng: 10.4 },
  { name: 'Pistoia', slug: 'pistoia', region: 'toscana', lat: 43.93, lng: 10.91 },
  { name: 'Prato', slug: 'prato', region: 'toscana', lat: 43.88, lng: 11.1 },
  { name: 'Siena', slug: 'siena', region: 'toscana', lat: 43.32, lng: 11.33 },
  // Umbria
  { name: 'Perugia', slug: 'perugia', region: 'umbria', lat: 43.11, lng: 12.39 },
  { name: 'Terni', slug: 'terni', region: 'umbria', lat: 42.56, lng: 12.65 },
  // Marche
  { name: 'Ancona', slug: 'ancona', region: 'marche', lat: 43.62, lng: 13.51 },
  { name: 'Ascoli Piceno', slug: 'ascoli-piceno', region: 'marche', lat: 42.85, lng: 13.58 },
  { name: 'Fermo', slug: 'fermo', region: 'marche', lat: 43.16, lng: 13.72 },
  { name: 'Macerata', slug: 'macerata', region: 'marche', lat: 43.3, lng: 13.45 },
  { name: 'Pesaro e Urbino', slug: 'pesaro-e-urbino', region: 'marche', lat: 43.91, lng: 12.91 },
  // Lazio
  { name: 'Roma', slug: 'roma', region: 'lazio', lat: 41.89, lng: 12.49 },
  { name: 'Frosinone', slug: 'frosinone', region: 'lazio', lat: 41.64, lng: 13.35 },
  { name: 'Latina', slug: 'latina', region: 'lazio', lat: 41.47, lng: 12.9 },
  { name: 'Rieti', slug: 'rieti', region: 'lazio', lat: 42.4, lng: 12.86 },
  { name: 'Viterbo', slug: 'viterbo', region: 'lazio', lat: 42.42, lng: 12.11 },
  // Abruzzo
  { name: 'L’Aquila', slug: 'l-aquila', region: 'abruzzo', lat: 42.35, lng: 13.4 },
  { name: 'Chieti', slug: 'chieti', region: 'abruzzo', lat: 42.35, lng: 14.17 },
  { name: 'Pescara', slug: 'pescara', region: 'abruzzo', lat: 42.46, lng: 14.21 },
  { name: 'Teramo', slug: 'teramo', region: 'abruzzo', lat: 42.66, lng: 13.7 },
  // Molise
  { name: 'Campobasso', slug: 'campobasso', region: 'molise', lat: 41.56, lng: 14.66 },
  { name: 'Isernia', slug: 'isernia', region: 'molise', lat: 41.6, lng: 14.23 },
  // Campania
  { name: 'Napoli', slug: 'napoli', region: 'campania', lat: 40.85, lng: 14.27 },
  { name: 'Avellino', slug: 'avellino', region: 'campania', lat: 40.91, lng: 14.79 },
  { name: 'Benevento', slug: 'benevento', region: 'campania', lat: 41.13, lng: 14.78 },
  { name: 'Caserta', slug: 'caserta', region: 'campania', lat: 41.07, lng: 14.33 },
  { name: 'Salerno', slug: 'salerno', region: 'campania', lat: 40.68, lng: 14.77 },
  // Puglia
  { name: 'Bari', slug: 'bari', region: 'puglia', lat: 41.12, lng: 16.87 },
  { name: 'Barletta-Andria-Trani', slug: 'barletta-andria-trani', region: 'puglia', lat: 41.32, lng: 16.28 },
  { name: 'Brindisi', slug: 'brindisi', region: 'puglia', lat: 40.64, lng: 17.94 },
  { name: 'Foggia', slug: 'foggia', region: 'puglia', lat: 41.46, lng: 15.55 },
  { name: 'Lecce', slug: 'lecce', region: 'puglia', lat: 40.35, lng: 18.17 },
  { name: 'Taranto', slug: 'taranto', region: 'puglia', lat: 40.47, lng: 17.23 },
  // Basilicata
  { name: 'Potenza', slug: 'potenza', region: 'basilicata', lat: 40.64, lng: 15.8 },
  { name: 'Matera', slug: 'matera', region: 'basilicata', lat: 40.67, lng: 16.6 },
  // Calabria
  { name: 'Catanzaro', slug: 'catanzaro', region: 'calabria', lat: 38.91, lng: 16.59 },
  { name: 'Cosenza', slug: 'cosenza', region: 'calabria', lat: 39.31, lng: 16.25 },
  { name: 'Crotone', slug: 'crotone', region: 'calabria', lat: 39.08, lng: 17.13 },
  { name: 'Reggio Calabria', slug: 'reggio-calabria', region: 'calabria', lat: 38.11, lng: 15.65 },
  { name: 'Vibo Valentia', slug: 'vibo-valentia', region: 'calabria', lat: 38.68, lng: 16.1 },
  // Sicilia
  { name: 'Palermo', slug: 'palermo', region: 'sicilia', lat: 38.12, lng: 13.36 },
  { name: 'Agrigento', slug: 'agrigento', region: 'sicilia', lat: 37.31, lng: 13.58 },
  { name: 'Caltanissetta', slug: 'caltanissetta', region: 'sicilia', lat: 37.49, lng: 14.06 },
  { name: 'Catania', slug: 'catania', region: 'sicilia', lat: 37.5, lng: 15.09 },
  { name: 'Enna', slug: 'enna', region: 'sicilia', lat: 37.57, lng: 14.28 },
  { name: 'Messina', slug: 'messina', region: 'sicilia', lat: 38.19, lng: 15.55 },
  { name: 'Ragusa', slug: 'ragusa', region: 'sicilia', lat: 36.93, lng: 14.73 },
  { name: 'Siracusa', slug: 'siracusa', region: 'sicilia', lat: 37.08, lng: 15.28 },
  { name: 'Trapani', slug: 'trapani', region: 'sicilia', lat: 38.02, lng: 12.54 },
  // Sardegna
  { name: 'Cagliari', slug: 'cagliari', region: 'sardegna', lat: 39.22, lng: 9.1 },
  { name: 'Nuoro', slug: 'nuoro', region: 'sardegna', lat: 40.32, lng: 9.33 },
  { name: 'Oristano', slug: 'oristano', region: 'sardegna', lat: 39.9, lng: 8.59 },
  { name: 'Sassari', slug: 'sassari', region: 'sardegna', lat: 40.73, lng: 8.56 },
  { name: 'Sud Sardegna', slug: 'sud-sardegna', region: 'sardegna', lat: 39.17, lng: 8.52 },
]
