<script lang="ts">
  import { cart } from '$lib/stores/cart';
  import { slide, fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let whatsappNumber: string;

  let isExpanded = false;
  let cartButtonRef: HTMLButtonElement;

  $: total = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $: itemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);

  function createWhatsAppMessage() {
    const items = $cart.map(item => {
      const variants = Object.entries(item.selectedVariants)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      return `- ${item.name} (${variants}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    }).join('\n');

    const message = `Hi! I would like to order:\n${items}\n\nTotal: $${total.toFixed(2)}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function removeItem(productId: string, selectedVariants: Record<string, string>) {
    cart.removeItem(productId, selectedVariants);
  }

  function handleClickOutside(event: MouseEvent) {
    if (isExpanded && cartButtonRef && !cartButtonRef.contains(event.target as Node) && !(event.target as HTMLElement).closest('.cart-content')) {
      isExpanded = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="fixed bottom-4 right-4 z-50 flex flex-col items-end color-font-texto-negro">
  {#if isExpanded}
    <div 
      class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md mb-4 border border-white/20 cart-content"
      transition:slide={{ duration: 300, easing: cubicOut }}
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Tu Carrito</h2>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">{itemCount} artículos</span>
          <button
            class="text-gray-400 hover:text-gray-600 transition-colors"
            on:click={() => isExpanded = false}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {#if $cart.length > 0}
        <div class="max-h-[60vh] overflow-y-auto mb-6 pr-2 space-y-4">
          {#each $cart as item (item.productId + JSON.stringify(item.selectedVariants))}
            <div
              class="flex items-start space-x-4 p-4 rounded-xl bg-gray-50/50 backdrop-blur-sm"
              transition:slide|local={{ duration: 200 }}
            >
              <div class="flex-grow">
                <div class="flex justify-between items-start">
                  <h3 class="font-medium text-gray-900">{item.name}</h3>
                  <button
                    on:click={() => removeItem(item.productId, item.selectedVariants)}
                    class="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div class="mt-1 space-y-1">
                  <p class="text-sm text-gray-600">
                    {#each Object.entries(item.selectedVariants) as [key, value]}
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {key}: {value}
                      </span>
                      {#if key !== Object.keys(item.selectedVariants).slice(-1)[0]}
                        <span class="mx-1">·</span>
                      {/if}
                    {/each}
                  </p>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-500">Qty: {item.quantity}</span>
                    <span class="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="border-t border-gray-200 pt-4 space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-lg font-medium">Total</span>
            <span class="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
          
          <a
            href={createWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            class="block w-full bg-green-500 text-white text-center px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Completar Pedido en WhatsApp
          </a>
        </div>
      {:else}
        <div class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p class="text-gray-500 text-lg">Tu carrito está vacío</p>
          <p class="text-gray-400 text-sm mt-2">Agrega algunos productos para comenzar</p>
        </div>
      {/if}
    </div>
  {/if}

  <button
    bind:this={cartButtonRef}
    class="bg-color-button-principal text-white rounded-full p-4 shadow-lg hover:bg-purple-500 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5"
    on:click={() => isExpanded = !isExpanded}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    {#if itemCount > 0}
      <span 
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white"
        in:fade={{ duration: 200 }}
      >
        {itemCount}
      </span>
    {/if}
  </button>
</div>