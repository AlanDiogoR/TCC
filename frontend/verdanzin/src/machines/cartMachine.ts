import { setup, types } from 'xstate';
import { z } from 'zod';
import type { Adress } from '../types/Adress';

export const cartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  quantity: z.number(),
  imagePath: z.string().optional(),
  details: z.string().optional(),
  purchaseItemId: z.string().optional()
});

export type CartItem = z.infer<typeof cartItemSchema>;

export interface CartContext {
  userEmail: string | null;
  address: Adress | null;
  items: CartItem[];
  shippingCost: number;
  deliveryDays: number;
  paymentMethod: 'pix' | 'stripe' | null;
  error: string | null;
  subtotal: number;
  total: number;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateShipping(address: Adress | null): { cost: number; days: number } {
  if (address?.city && address.city.trim().toLowerCase() === 'fartura') {
    return { cost: 0, days: 2 };
  }
  return { cost: 12, days: 5 };
}

export const cartMachine = setup({
  schemas: {
    context: types<CartContext>(),
    events: {
      setUser: types<{ email: string }>(),
      startLoading: types<void>(),
      loadSuccess: types<{
        items: CartItem[];
        address?: Adress | null;
      }>(),
      loadFailure: types<{ error: string }>(),
      addItem: types<{ item: CartItem }>(),
      updateQuantity: types<{ productId: string; quantity: number }>(),
      removeItem: types<{ productId: string }>(),
      setAddress: types<{ address: Adress | null }>(),
      selectPaymentMethod: types<{ method: 'pix' | 'stripe' }>(),
      submitPayment: types<void>(),
      paymentSuccess: types<void>(),
      paymentFailure: types<{ error: string }>(),
      retryPayment: types<void>(),
      reset: types<void>()
    }
  }
}).createMachine({
  id: 'cartMachine',
  initial: 'idle',
  context: {
    userEmail: null,
    address: null,
    items: [],
    shippingCost: 12,
    deliveryDays: 5,
    paymentMethod: null,
    error: null,
    subtotal: 0,
    total: 0
  },
  states: {
    idle: {
      on: {
        setUser: ({ event }) => ({
          context: { userEmail: event.email }
        }),
        startLoading: () => ({ target: 'loading' }),
        loadSuccess: ({ context, event }) => {
          const shipping = event.address ? calculateShipping(event.address) : { cost: context.shippingCost, days: context.deliveryDays };
          const subtotal = calculateSubtotal(event.items);
          const hasItems = event.items.length > 0;
          return {
            target: hasItems ? 'ready' : 'empty',
            context: {
              items: event.items,
              address: event.address ?? context.address,
              shippingCost: shipping.cost,
              deliveryDays: shipping.days,
              subtotal,
              total: subtotal + shipping.cost,
              error: null
            }
          };
        }
      }
    },
    loading: {
      on: {
        loadSuccess: ({ context, event }) => {
          const shipping = event.address ? calculateShipping(event.address) : { cost: context.shippingCost, days: context.deliveryDays };
          const subtotal = calculateSubtotal(event.items);
          const hasItems = event.items.length > 0;
          return {
            target: hasItems ? 'ready' : 'empty',
            context: {
              items: event.items,
              address: event.address ?? context.address,
              shippingCost: shipping.cost,
              deliveryDays: shipping.days,
              subtotal,
              total: subtotal + shipping.cost,
              error: null
            }
          };
        },
        loadFailure: ({ event }) => ({
          target: 'error',
          context: { error: event.error }
        })
      }
    },
    empty: {
      on: {
        addItem: ({ context, event }) => {
          const items = [...context.items, event.item];
          const subtotal = calculateSubtotal(items);
          return {
            target: 'ready',
            context: {
              items,
              subtotal,
              total: subtotal + context.shippingCost
            }
          };
        },
        loadSuccess: ({ context, event }) => {
          const subtotal = calculateSubtotal(event.items);
          const hasItems = event.items.length > 0;
          return {
            target: hasItems ? 'ready' : 'empty',
            context: {
              items: event.items,
              subtotal,
              total: subtotal + context.shippingCost
            }
          };
        }
      }
    },
    ready: {
      on: {
        updateQuantity: ({ context, event }) => {
          const currentItem = context.items.find(i => i.productId === event.productId);
          if (!currentItem) return;
          if (event.quantity < 1 || event.quantity > currentItem.stock) return;

          const items = context.items.map(item =>
            item.productId === event.productId
              ? { ...item, quantity: event.quantity }
              : item
          );
          const subtotal = calculateSubtotal(items);
          return {
            context: {
              items,
              subtotal,
              total: subtotal + context.shippingCost
            }
          };
        },
        removeItem: ({ context, event }) => {
          const items = context.items.filter(i => i.productId !== event.productId);
          const subtotal = calculateSubtotal(items);
          const hasItems = items.length > 0;
          return {
            target: hasItems ? 'ready' : 'empty',
            context: {
              items,
              subtotal,
              total: subtotal + (hasItems ? context.shippingCost : 0)
            }
          };
        },
        setAddress: ({ context, event }) => {
          const shipping = calculateShipping(event.address);
          return {
            context: {
              address: event.address,
              shippingCost: shipping.cost,
              deliveryDays: shipping.days,
              total: context.subtotal + shipping.cost
            }
          };
        },
        selectPaymentMethod: ({ event }) => ({
          context: { paymentMethod: event.method }
        }),
        submitPayment: ({ context }) => {
          if (context.items.length > 0 && context.paymentMethod) {
            return {
              target: 'submittingPayment',
              context: { error: null }
            };
          }
        }
      }
    },
    submittingPayment: {
      on: {
        paymentSuccess: () => ({
          target: 'paymentSuccess',
          context: {
            items: [],
            subtotal: 0,
            total: 0,
            error: null
          }
        }),
        paymentFailure: ({ event }) => ({
          target: 'paymentError',
          context: { error: event.error }
        })
      }
    },
    paymentSuccess: {
      on: {
        reset: () => ({
          target: 'empty',
          context: {
            paymentMethod: null,
            error: null
          }
        })
      }
    },
    paymentError: {
      on: {
        retryPayment: () => ({ target: 'ready' }),
        selectPaymentMethod: ({ event }) => ({
          target: 'ready',
          context: { paymentMethod: event.method }
        })
      }
    },
    error: {
      on: {
        startLoading: () => ({ target: 'loading' }),
        reset: () => ({ target: 'idle', context: { error: null } })
      }
    }
  }
});
