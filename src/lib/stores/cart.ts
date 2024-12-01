import { writable } from 'svelte/store';
import type { CartItem } from '$lib/types/product';

function createCart() {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  return {
    subscribe,
    addItem: (item: CartItem) => update(items => {
      const existingItemIndex = items.findIndex(i => i.productId === item.productId);

      if (existingItemIndex !== -1) {
        items[existingItemIndex].quantity += item.quantity;
        return [...items];
      }
      return [...items, item];
    }),
    removeItem: (productId: string) => 
      update(items => items.filter(i => i.productId !== productId)),
    updateQuantity: (productId: string, quantity: number) =>
      update(items => items.map(i => 
        i.productId === productId ? { ...i, quantity } : i
      )),
    clear: () => set([])
  };
}

export const cart = createCart();