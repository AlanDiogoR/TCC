import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createActor } from 'xstate';
import { cartMachine, calculateShipping, calculateSubtotal } from './cartMachine.ts';
import type { CartItem } from './cartMachine.ts';
import type { Adress } from '../types/Adress';

describe('cartMachine (XState v6 Beta)', () => {
  const sampleItem1: CartItem = {
    productId: 'prod-1',
    name: 'Teclado Mecânico RGB',
    price: 250,
    stock: 5,
    quantity: 1,
    details: 'Switch Azul'
  };

  const sampleItem2: CartItem = {
    productId: 'prod-2',
    name: 'Mouse Gamer',
    price: 150,
    stock: 2,
    quantity: 1,
    details: '16000 DPI'
  };

  const sampleAddressFartura: Adress = {
    _id: 'addr-1',
    ZipCode: '18870-000',
    city: 'Fartura',
    state: 'SP',
    neighborhood: 'Centro',
    street: 'Rua Principal',
    numberHouse: 100,
    userId: 'user-1'
  };

  const sampleAddressSP: Adress = {
    _id: 'addr-2',
    ZipCode: '01001-000',
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Sé',
    street: 'Praça da Sé',
    numberHouse: 1,
    userId: 'user-1'
  };

  test('utility functions: calculateSubtotal and calculateShipping', () => {
    assert.strictEqual(calculateSubtotal([sampleItem1, sampleItem2]), 400);
    assert.strictEqual(calculateSubtotal([]), 0);

    const farturaShipping = calculateShipping(sampleAddressFartura);
    assert.strictEqual(farturaShipping.cost, 0);
    assert.strictEqual(farturaShipping.days, 2);

    const spShipping = calculateShipping(sampleAddressSP);
    assert.strictEqual(spShipping.cost, 12);
    assert.strictEqual(spShipping.days, 5);

    const nullShipping = calculateShipping(null);
    assert.strictEqual(nullShipping.cost, 12);
    assert.strictEqual(nullShipping.days, 5);
  });

  test('initial state is idle and accepts setUser', () => {
    const actor = createActor(cartMachine).start();
    assert.strictEqual(actor.getSnapshot().value, 'idle');

    actor.trigger.setUser({ email: 'alan@verdan.com' });
    assert.strictEqual(actor.getSnapshot().context.userEmail, 'alan@verdan.com');
  });

  test('transitions idle -> loading -> error upon failure', () => {
    const actor = createActor(cartMachine).start();
    actor.trigger.startLoading({});
    assert.strictEqual(actor.getSnapshot().value, 'loading');

    actor.trigger.loadFailure({ error: 'Falha de conexão com a API' });
    assert.strictEqual(actor.getSnapshot().value, 'error');
    assert.strictEqual(actor.getSnapshot().context.error, 'Falha de conexão com a API');

    actor.trigger.reset({});
    assert.strictEqual(actor.getSnapshot().value, 'idle');
    assert.strictEqual(actor.getSnapshot().context.error, null);
  });

  test('transitions to empty when loadSuccess has no items', () => {
    const actor = createActor(cartMachine).start();
    actor.trigger.startLoading({});
    actor.trigger.loadSuccess({ items: [] });
    assert.strictEqual(actor.getSnapshot().value, 'empty');
    assert.strictEqual(actor.getSnapshot().context.items.length, 0);
    assert.strictEqual(actor.getSnapshot().context.subtotal, 0);
  });

  test('transitions to ready when loadSuccess has items and calculates totals', () => {
    const actor = createActor(cartMachine).start();
    actor.trigger.loadSuccess({
      items: [sampleItem1, sampleItem2],
      address: sampleAddressFartura
    });

    assert.strictEqual(actor.getSnapshot().value, 'ready');
    const ctx = actor.getSnapshot().context;
    assert.strictEqual(ctx.items.length, 2);
    assert.strictEqual(ctx.subtotal, 400);
    assert.strictEqual(ctx.shippingCost, 0); // Fartura has free shipping
    assert.strictEqual(ctx.total, 400);
  });

  test('updates quantity and enforces stock and minimum boundaries', () => {
    const actor = createActor(cartMachine).start();
    actor.trigger.loadSuccess({
      items: [sampleItem1],
      address: sampleAddressSP
    });

    assert.strictEqual(actor.getSnapshot().context.subtotal, 250);
    assert.strictEqual(actor.getSnapshot().context.total, 262); // 250 + 12 frete

    // Valid increase
    actor.trigger.updateQuantity({ productId: 'prod-1', quantity: 3 });
    assert.strictEqual(actor.getSnapshot().context.items[0].quantity, 3);
    assert.strictEqual(actor.getSnapshot().context.subtotal, 750);
    assert.strictEqual(actor.getSnapshot().context.total, 762);

    // Invalid increase: exceeds stock of 5
    actor.trigger.updateQuantity({ productId: 'prod-1', quantity: 6 });
    assert.strictEqual(actor.getSnapshot().context.items[0].quantity, 3); // ignored
    assert.strictEqual(actor.getSnapshot().context.subtotal, 750);

    // Invalid decrease: below 1
    actor.trigger.updateQuantity({ productId: 'prod-1', quantity: 0 });
    assert.strictEqual(actor.getSnapshot().context.items[0].quantity, 3); // ignored
  });

  test('removes items and transitions to empty when last item is removed', () => {
    const actor = createActor(cartMachine).start();
    actor.trigger.loadSuccess({ items: [sampleItem1, sampleItem2] });
    assert.strictEqual(actor.getSnapshot().value, 'ready');
    assert.strictEqual(actor.getSnapshot().context.items.length, 2);

    actor.trigger.removeItem({ productId: 'prod-1' });
    assert.strictEqual(actor.getSnapshot().value, 'ready');
    assert.strictEqual(actor.getSnapshot().context.items.length, 1);
    assert.strictEqual(actor.getSnapshot().context.subtotal, 150);

    actor.trigger.removeItem({ productId: 'prod-2' });
    assert.strictEqual(actor.getSnapshot().value, 'empty');
    assert.strictEqual(actor.getSnapshot().context.items.length, 0);
    assert.strictEqual(actor.getSnapshot().context.subtotal, 0);
    assert.strictEqual(actor.getSnapshot().context.total, 0);
  });

  test('dynamically changes address and recalculates shipping', () => {
    const actor = createActor(cartMachine).start();
    actor.trigger.loadSuccess({ items: [sampleItem1], address: sampleAddressSP });
    assert.strictEqual(actor.getSnapshot().context.shippingCost, 12);
    assert.strictEqual(actor.getSnapshot().context.deliveryDays, 5);
    assert.strictEqual(actor.getSnapshot().context.total, 262);

    // Change to Fartura -> free shipping
    actor.trigger.setAddress({ address: sampleAddressFartura });
    assert.strictEqual(actor.getSnapshot().context.shippingCost, 0);
    assert.strictEqual(actor.getSnapshot().context.deliveryDays, 2);
    assert.strictEqual(actor.getSnapshot().context.total, 250);
  });

  test('checkout and payment lifecycle: guard, submission, failure, retry and success', () => {
    const actor = createActor(cartMachine).start();
    actor.trigger.loadSuccess({ items: [sampleItem1], address: sampleAddressFartura });

    // Guard: cannot submit payment without selecting paymentMethod
    actor.trigger.submitPayment({});
    assert.strictEqual(actor.getSnapshot().value, 'ready'); // stayed in ready

    // Select payment method
    actor.trigger.selectPaymentMethod({ method: 'pix' });
    assert.strictEqual(actor.getSnapshot().context.paymentMethod, 'pix');

    // Submit payment
    actor.trigger.submitPayment({});
    assert.strictEqual(actor.getSnapshot().value, 'submittingPayment');

    // While submitting payment, cart mutations are ignored
    actor.trigger.updateQuantity({ productId: 'prod-1', quantity: 2 });
    assert.strictEqual(actor.getSnapshot().context.items[0].quantity, 1);
    actor.trigger.removeItem({ productId: 'prod-1' });
    assert.strictEqual(actor.getSnapshot().context.items.length, 1);

    // Simulate payment error (e.g. gateway timeout)
    actor.trigger.paymentFailure({ error: 'Tempo limite esgotado no gateway' });
    assert.strictEqual(actor.getSnapshot().value, 'paymentError');
    assert.strictEqual(actor.getSnapshot().context.error, 'Tempo limite esgotado no gateway');

    // Retry payment returns to ready
    actor.trigger.retryPayment({});
    assert.strictEqual(actor.getSnapshot().value, 'ready');

    // Change payment method to stripe and re-submit
    actor.trigger.selectPaymentMethod({ method: 'stripe' });
    actor.trigger.submitPayment({});
    assert.strictEqual(actor.getSnapshot().value, 'submittingPayment');

    // Successful payment
    actor.trigger.paymentSuccess({});
    assert.strictEqual(actor.getSnapshot().value, 'paymentSuccess');
    assert.strictEqual(actor.getSnapshot().context.items.length, 0);
    assert.strictEqual(actor.getSnapshot().context.total, 0);

    // Reset machine returns to empty
    actor.trigger.reset({});
    assert.strictEqual(actor.getSnapshot().value, 'empty');
  });
});
