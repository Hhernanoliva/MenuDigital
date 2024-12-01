import { writable } from 'svelte/store';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedVariants: Record<string, string>;
};

function createCart() {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  return {
    subscribe,
    addItem: (item: CartItem) => update(items => {
      const existingItemIndex = items.findIndex(i => 
        i.productId === item.productId && 
        JSON.stringify(i.selectedVariants) === JSON.stringify(item.selectedVariants)
      );

      if (existingItemIndex !== -1) {
        items[existingItemIndex].quantity += item.quantity;
        return [...items];
      }
      return [...items, item];
    }),
    removeItem: (productId: string, selectedVariants: Record<string, string>) => 
      update(items => items.filter(i => 
        !(i.productId === productId && 
          JSON.stringify(i.selectedVariants) === JSON.stringify(selectedVariants))
      )),
    updateQuantity: (productId: string, selectedVariants: Record<string, string>, quantity: number) =>
      update(items => items.map(i => 
        i.productId === productId && 
        JSON.stringify(i.selectedVariants) === JSON.stringify(selectedVariants)
          ? { ...i, quantity }
          : i
      )),
    clear: () => set([])
  };
}

export const cart = createCart();