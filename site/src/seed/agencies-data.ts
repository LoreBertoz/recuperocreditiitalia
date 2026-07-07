/**
 * Agenzie FITTIZIE di esempio per sviluppo/demo.
 * Da sostituire con le agenzie sponsor reali prima del lancio.
 */

export type AgencySeed = {
  name: string
  slug: string
  descriptionShort: string
  paragraphs: ({ h2: string } | { p: string } | { li: string[] })[]
  services: string[] // slug dei servizi
  coverage: { type: 'regione' | 'provincia'; slug: string }[]
  headquarters: {
    address: string
    city: string
    province: string
    postalCode: string
    lat: number
    lng: number
  }
  contactPhone: string
  contactEmail: string
  website?: string
  whatsapp?: string
  sponsorTier: 'base' | 'premium' | 'top'
  subscriptionStatus: 'pending' | 'active' | 'suspended'
  verified: boolean
}

export const agencies: AgencySeed[] = [
  {
    name: 'Recupera Milano S.r.l.',
    slug: 'recupera-milano',
    descriptionShort:
      'Agenzia milanese specializzata nel credito commerciale B2B: phone collection strutturata, legali interni e reportistica mensile per le aziende.',
    paragraphs: [
      {
        p: 'Recupera Milano opera dal 2009 nel recupero crediti per le imprese lombarde. Il team unisce operatori di phone collection, esattori sul territorio e un ufficio legale interno per la gestione completa della pratica, dalla diffida al decreto ingiuntivo.',
      },
      { h2: 'Come lavoriamo' },
      {
        li: [
          'Analisi gratuita di solvibilità prima di aprire la pratica',
          'Solleciti telefonici e scritti entro 48 ore dall’affido',
          'Report mensile sullo stato di ogni posizione',
          'Compenso solo a risultato sulla fase stragiudiziale',
        ],
      },
    ],
    services: [
      'recupero-crediti-stragiudiziale',
      'recupero-crediti-giudiziale',
      'recupero-crediti-commerciali-b2b',
      'informazioni-commerciali-visure',
    ],
    coverage: [
      { type: 'regione', slug: 'lombardia' },
      { type: 'provincia', slug: 'milano' },
      { type: 'provincia', slug: 'monza-e-brianza' },
      { type: 'provincia', slug: 'bergamo' },
    ],
    headquarters: {
      address: 'Via Vittor Pisani 10',
      city: 'Milano',
      province: 'MI',
      postalCode: '20124',
      lat: 45.4842,
      lng: 9.2012,
    },
    contactPhone: '+39 02 0000 0001',
    contactEmail: 'info@recuperamilano.example',
    website: 'https://www.recuperamilano.example',
    whatsapp: '+39 320 000 0001',
    sponsorTier: 'top',
    subscriptionStatus: 'active',
    verified: true,
  },
  {
    name: 'Credit Solve Roma',
    slug: 'credit-solve-roma',
    descriptionShort:
      'Recupero crediti a Roma e nel Lazio per condomini, proprietari immobiliari e professionisti. Specialisti di morosità e sfratti.',
    paragraphs: [
      {
        p: 'Credit Solve Roma assiste amministratori di condominio, proprietari e studi professionali nel recupero di canoni, quote condominiali e compensi non pagati su Roma e provincia.',
      },
      { h2: 'Specializzazioni' },
      {
        li: [
          'Morosità condominiali con decreto ingiuntivo ex art. 63',
          'Sfratti per morosità e recupero canoni arretrati',
          'Recupero compensi professionali',
        ],
      },
    ],
    services: [
      'recupero-crediti-stragiudiziale',
      'recupero-canoni-locazione-condominiali',
      'recupero-crediti-verso-privati',
    ],
    coverage: [
      { type: 'regione', slug: 'lazio' },
      { type: 'provincia', slug: 'roma' },
    ],
    headquarters: {
      address: 'Viale Trastevere 40',
      city: 'Roma',
      province: 'RM',
      postalCode: '00153',
      lat: 41.8837,
      lng: 12.4707,
    },
    contactPhone: '+39 06 0000 0002',
    contactEmail: 'info@creditsolveroma.example',
    website: 'https://www.creditsolveroma.example',
    sponsorTier: 'premium',
    subscriptionStatus: 'active',
    verified: true,
  },
  {
    name: 'Veneto Crediti Group',
    slug: 'veneto-crediti-group',
    descriptionShort:
      'Il partner delle PMI venete per il credito commerciale: recupero B2B in Italia e all’estero, con corrispondenti in 40 Paesi.',
    paragraphs: [
      {
        p: 'Veneto Crediti Group nasce a Padova al servizio dei distretti manifatturieri del Nordest. Gestisce insoluti commerciali in Italia e, tramite una rete di corrispondenti, in oltre 40 Paesi.',
      },
      { h2: 'Punti di forza' },
      {
        li: [
          'Desk export dedicato con gestione pratiche in inglese, tedesco e francese',
          'Ingiunzione di pagamento europea per i crediti UE',
          'Monitoraggio del portafoglio clienti e valutazioni fido',
        ],
      },
    ],
    services: [
      'recupero-crediti-commerciali-b2b',
      'recupero-crediti-internazionale',
      'informazioni-commerciali-visure',
      'recupero-crediti-stragiudiziale',
    ],
    coverage: [
      { type: 'regione', slug: 'veneto' },
      { type: 'provincia', slug: 'padova' },
      { type: 'provincia', slug: 'treviso' },
      { type: 'provincia', slug: 'vicenza' },
    ],
    headquarters: {
      address: 'Via Trieste 25',
      city: 'Padova',
      province: 'PD',
      postalCode: '35121',
      lat: 45.4123,
      lng: 11.8865,
    },
    contactPhone: '+39 049 000 0003',
    contactEmail: 'info@venetocrediti.example',
    website: 'https://www.venetocrediti.example',
    whatsapp: '+39 340 000 0003',
    sponsorTier: 'premium',
    subscriptionStatus: 'active',
    verified: true,
  },
  {
    name: 'Sud Recuperi Napoli',
    slug: 'sud-recuperi-napoli',
    descriptionShort:
      'Recupero crediti in Campania con rete di esattori domiciliari: contatto diretto con il debitore, piani di rientro e recupero giudiziale.',
    paragraphs: [
      {
        p: 'Sud Recuperi opera su Napoli e su tutta la Campania con una rete capillare di esattori domiciliari, per le situazioni in cui il contatto di persona fa la differenza.',
      },
    ],
    services: [
      'recupero-crediti-stragiudiziale',
      'recupero-crediti-verso-privati',
      'recupero-crediti-giudiziale',
    ],
    coverage: [
      { type: 'regione', slug: 'campania' },
      { type: 'provincia', slug: 'napoli' },
      { type: 'provincia', slug: 'salerno' },
    ],
    headquarters: {
      address: 'Corso Umberto I 120',
      city: 'Napoli',
      province: 'NA',
      postalCode: '80138',
      lat: 40.8467,
      lng: 14.2647,
    },
    contactPhone: '+39 081 000 0004',
    contactEmail: 'info@sudrecuperi.example',
    sponsorTier: 'base',
    subscriptionStatus: 'active',
    verified: false,
  },
  {
    name: 'Emilia Credit Service',
    slug: 'emilia-credit-service',
    descriptionShort:
      'Da Bologna, recupero crediti e cessione NPL per l’industria emiliana: valutazione gratuita dei portafogli e liquidità in tempi rapidi.',
    paragraphs: [
      {
        p: 'Emilia Credit Service affianca le imprese dell’Emilia-Romagna sia nel recupero tradizionale sia nella cessione pro soluto di crediti e portafogli NPL, con valutazione gratuita entro 5 giorni lavorativi.',
      },
    ],
    services: [
      'recupero-crediti-commerciali-b2b',
      'cessione-del-credito-npl',
      'recupero-crediti-stragiudiziale',
    ],
    coverage: [
      { type: 'regione', slug: 'emilia-romagna' },
      { type: 'provincia', slug: 'bologna' },
      { type: 'provincia', slug: 'modena' },
    ],
    headquarters: {
      address: 'Via Indipendenza 8',
      city: 'Bologna',
      province: 'BO',
      postalCode: '40121',
      lat: 44.4991,
      lng: 11.3417,
    },
    contactPhone: '+39 051 000 0005',
    contactEmail: 'info@emiliacredit.example',
    website: 'https://www.emiliacredit.example',
    sponsorTier: 'base',
    subscriptionStatus: 'active',
    verified: false,
  },
  {
    name: 'Sicilia Incassi',
    slug: 'sicilia-incassi',
    descriptionShort:
      'Recupero crediti su tutta la Sicilia: solleciti, diffide e recupero domiciliare da Palermo a Catania. (In attesa di attivazione.)',
    paragraphs: [
      {
        p: 'Sicilia Incassi copre l’intero territorio siciliano con sedi operative a Palermo e Catania. Esempio di agenzia con abbonamento in attesa di attivazione: NON visibile sul sito pubblico.',
      },
    ],
    services: ['recupero-crediti-stragiudiziale', 'recupero-crediti-verso-privati'],
    coverage: [{ type: 'regione', slug: 'sicilia' }],
    headquarters: {
      address: 'Via Maqueda 100',
      city: 'Palermo',
      province: 'PA',
      postalCode: '90133',
      lat: 38.1157,
      lng: 13.3615,
    },
    contactPhone: '+39 091 000 0006',
    contactEmail: 'info@siciliaincassi.example',
    sponsorTier: 'base',
    subscriptionStatus: 'pending',
    verified: false,
  },
]
