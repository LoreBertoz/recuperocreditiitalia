/**
 * STUB webhook Stripe — PREDISPOSIZIONE, NON ATTIVO.
 *
 * I pagamenti in questa fase sono MANUALI: lo staff riceve il bonifico e attiva
 * lo sponsor dal pannello admin (subscriptionStatus = 'active' + sponsorTier).
 *
 * Quando si attiverà Stripe:
 * 1. Aggiungere la dipendenza `stripe` e le chiavi in .env (già previste in .env.example).
 * 2. Verificare la firma con STRIPE_WEBHOOK_SECRET (stripe.webhooks.constructEvent).
 * 3. Gestire gli eventi:
 *    - checkout.session.completed / customer.subscription.created →
 *        agencies.subscriptionStatus = 'active', salvare stripeCustomerId
 *    - customer.subscription.deleted / invoice.payment_failed →
 *        agencies.subscriptionStatus = 'suspended'
 * 4. Mappare il price Stripe → sponsorTier.
 */
export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return Response.json(
      { error: 'Stripe non configurato: pagamenti gestiti manualmente.' },
      { status: 501 },
    )
  }

  // Placeholder: quando Stripe sarà attivo, la verifica firma e la gestione
  // eventi sostituiranno questo blocco.
  await request.text()
  return Response.json({ received: true })
}
