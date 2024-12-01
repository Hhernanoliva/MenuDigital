<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import type { CartItem } from '$lib/types/product';
  
  export let show = false;
  export let product: CartItem;
  export let cartItems: CartItem[];
  export let whatsappNumber: string;
  export let onClose: () => void;
  
  $: currentItemTotal = product.price * product.quantity;
  $: cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $: combinedTotal = cartTotal + currentItemTotal;
  
  function createWhatsAppMessage(items: CartItem[]) {
    const itemsList = items.map(item => {
      const variants = Object.entries(item.selectedVariants)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      return `- ${item.name} (${variants}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    }).join('\n');

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi! I would like to order:\n${itemsList}\n\nTotal: $${total.toFixed(2)}`)}`;
  }

  function handleClickOutside(event: MouseEvent) {
    const modal = event.target as HTMLElement;
    if (modal.classList.contains('modal-backdrop')) {
      onClose();
    }
  }
</script>

{#if show}
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center modal-backdrop color-font-texto-negro"
    on:click={handleClickOutside}
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 transform"
      transition:scale={{ duration: 200 }}
    >
      <h2 class="text-xl font-bold mb-4">Elige Opción de Compra</h2>
      
      <div class="space-y-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600">Total del Artículo Actual:</span>
            <span class="font-medium">${currentItemTotal.toFixed(2)}</span>
          </div>
          <a
            href={createWhatsAppMessage([product])}
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full bg-purple-400 text-white text-center px-6 py-3 rounded-xl font-medium hover:bg-purple-500 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Comprar Solo Este Artículo
          </a>
        </div>
        
        {#if cartItems.length > 0}
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <div class="space-y-2 mb-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Total de Artículos en el Carrito:</span>
                <span class="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-600">Artículo Actual:</span>
                <span class="font-medium">${currentItemTotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center text-lg pt-2 border-t border-gray-200">
                <span class="font-medium text-gray-700">Total Combinado:</span>
                <span class="font-bold text-blue-600">${combinedTotal.toFixed(2)}</span>
              </div>
            </div>

            <a
              href={createWhatsAppMessage([...cartItems, product])}
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full bg-color-button-cuarto hover:bg-lime-400 active:bg-lime-500 text-white text-center px-6 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Comprar Todos los Artículos ({cartItems.length + 1})
            </a>
          </div>
        {/if}
        
        <button
          class="block w-full border border-gray-300 text-gray-700 text-center px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors mt-2"
          on:click={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
{/if}