import { headers } from 'next/headers';
import { NextResponse } from 'next/server';


import prisma from '@/lib/db';
import { stripe } from '@/lib/stripe';

import type Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];

    const addressString = addressComponents
      .filter((c) => c !== null)
      .join(', ');

    if (event.type === 'checkout.session.completed') {
      const order = await prisma.order.update({
        where: { id: session?.metadata?.orderId },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || '',
        },
        include: { orderItems: true },
      });

      const productIds = order.orderItems.map(
        (orderItem) => orderItem.productId,
      );

      await prisma.product.updateMany({
        where: { id: { in: [...productIds] } },
        data: { isArchived: true },
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Webhook Error: ${error.message}`, {
        status: 400,
      });
    }
  }
}
