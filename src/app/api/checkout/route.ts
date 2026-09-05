import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../lib/rate-limit";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-03-31.basil",
  });
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "checkout", 10);
  if (limited) return limited;

  try {
    const { plan } = await req.json();

    const prices: Record<string, { amount: number; name: string }> = {
      single: { amount: 2900, name: "Single Analysis — up to 10 transcripts" },
      deep: { amount: 7900, name: "Deep Sprint — up to 20 transcripts + strategic maps" },
    };

    const selected = prices[plan] || prices.single;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "ideal"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: selected.name },
            unit_amount: selected.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/research-sprint/analyze?paid=true&plan=${plan}`,
      cancel_url: `${req.nextUrl.origin}/research-sprint/analyze?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
