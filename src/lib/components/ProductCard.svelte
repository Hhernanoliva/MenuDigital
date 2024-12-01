<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cart } from '$lib/stores/cart';
  import { onMount } from 'svelte';
  import type { Product, ProcessedVariant } from '$lib/types/product';
  import BuyConfirmationModal from './BuyConfirmationModal.svelte';
  import SizeGuideModal from './SizeGuideModal.svelte';
  
  export let product: Product;
  export let index: number;
  export let whatsappNumber: string;

  let quantity = 1;
  let selectedVariants: Record<string, string> = {};
  let isVisible = false;
  let cardElement: HTMLElement;
  let showBuyModal = false;
  let showSizeGuide = false;
  let currentPrice: number = product.basePrice;
  let currentOfertaPrecio: number | null = product.baseOfertaPrecio;

  $: cartItems = $cart;
  $: hasSizeVariants = product.variants.sizes && product.variants.sizes.length > 0;

  $: {
    currentPrice = product.basePrice;
    currentOfertaPrecio = product.baseOfertaPrecio;
    
    if (product.variants.sizes?.length && selectedVariants.size) {
      const selectedSize = product.variants.sizes.find(size => size.value === selectedVariants.size);
      if (selectedSize) {
        currentPrice = selectedSize.price ?? product.basePrice;
        currentOfertaPrecio = selectedSize.ofertaPrecio;
      }
    }
  }

  $: finalPrice = product.ofertaPorcentaje 
    ? currentPrice * (1 - product.ofertaPorcentaje / 100)
    : currentOfertaPrecio ?? currentPrice;

  $: discountPercentage = product.ofertaPorcentaje || 
    (currentOfertaPrecio ? Math.round((1 - currentOfertaPrecio / currentPrice) * 100) : null);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.5 }
    );

    if (cardElement) {
      observer.observe(cardElement);
    }
    
    if (product.variants.sizes?.length) {
      selectedVariants.size = product.variants.sizes[0].value;
      currentPrice = product.variants.sizes[0].price ?? product.basePrice;
      currentOfertaPrecio = product.variants.sizes[0].ofertaPrecio;
    }
    if (product.variants.colors?.length) {
      selectedVariants.color = product.variants.colors[0].value;
    }
    if (product.variants.flavors?.length) {
      selectedVariants.flavor = product.variants.flavors[0].value;
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  });

  function updatePrice(variant: ProcessedVariant) {
    currentPrice = variant.price ?? product.basePrice;
    currentOfertaPrecio = variant.ofertaPrecio;
  }

  function addToCart() {
    cart.addItem({
      productId: product.id,
      name: product.name,
      price: finalPrice,
      quantity,
      selectedVariants
    });
  }

  function formatNumberArgentina(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function buyNow() {
    if ($cart.length > 0) {
      showBuyModal = true;
    } else {
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: finalPrice,
        quantity,
        selectedVariants
      };
      const formattedPrice = formatNumberArgentina(cartItem.price);
      const formattedTotal = formatNumberArgentina(cartItem.price * cartItem.quantity);
      const whatsappMessage = `¡Hola! Me gustaría ordenar:\n- ${cartItem.name} (${Object.entries(cartItem.selectedVariants)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')}) x${cartItem.quantity} - $${formattedPrice}\n\nTotal: $${formattedTotal}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    }
  }

  function decrementQuantity() {
    if (quantity > 1) quantity--;
  }

  function incrementQuantity() {
    quantity++;
  }

  function updateQuantity(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value);
    if (value < 1) quantity = 1;
    else quantity = value;
  }
</script>

<div
  bind:this={cardElement}
  class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 flex flex-col h-full relative group"
  class:scale-102={isVisible}
  class:shadow-xl={isVisible}
  in:fly={{ y: 20, duration: 300, delay: index * 100 }}
>
  <div class="relative overflow-hidden">
    {#if currentOfertaPrecio || product.ofertaPorcentaje}
      <div class="absolute left-0 top-4 z-10">
        <div class="bg-red-500 text-white px-4 py-1 rounded-r-full shadow-md transform -translate-x-2 flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium text-sm">
            {discountPercentage}% OFF
          </span>
        </div>
      </div>
    {/if}
    
    <img 
      src={product.image} 
      alt={product.name}
      class="w-full h-64 object-cover transition-transform duration-300"
      class:scale-105={isVisible}
    />
  </div>

  <div class="p-6 flex flex-col flex-grow">
    <div class="flex-grow space-y-4">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h2 class="text-2xl font-bold text-gray-800 transition-colors leading-tight"
              class:text-blue-600={isVisible}>
            {product.name}
          </h2>
          <div class="flex flex-col items-end ml-4">
            {#if currentOfertaPrecio || product.ofertaPorcentaje}
              <div class="flex flex-col items-end">
                <span class="text-lg text-gray-400 line-through font-medium">
                  ${formatNumberArgentina(currentPrice)}
                </span>
                <div class="flex items-baseline space-x-1">
                  <span class="text-3xl font-bold text-red-500">
                    ${formatNumberArgentina(finalPrice)}
                  </span>
                </div>
              </div>
            {:else}
              <span class="text-3xl font-bold color-font-principal">
                ${formatNumberArgentina(currentPrice)}
              </span>
            {/if}
          </div>
        </div>
        <p class="text-gray-600">{product.description}</p>
      </div>
      
      <div class="space-y-4 bg-gray-50 p-4 rounded-lg">
        {#if hasSizeVariants}
          <div class="relative">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-semibold text-gray-700">
                Talle:
              </label>
              <button
                class="text-sm color-font-principal hover:color-font-principal-intenso transition-colors flex items-center space-x-1"
                on:click={() => showSizeGuide = true}
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Guía de talles</span>
              </button>
            </div>
            <div class="grid grid-cols-3 gap-2">
              {#each product.variants.sizes as size}
                <button
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  class:bg-color-button-principal={selectedVariants.size === size.value}
                  class:text-white={selectedVariants.size === size.value}
                  class:bg-white={selectedVariants.size !== size.value}
                  class:text-gray-700={selectedVariants.size !== size.value}
                  on:click={() => {
                    selectedVariants.size = size.value;
                    updatePrice(size);
                  }}
                >
                  {size.value}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if product.variants.colors && product.variants.colors.length > 0}
          <div class="relative">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Color:
            </label>
            <div class="grid grid-cols-3 gap-2">
              {#each product.variants.colors as color}
                <button
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  class:bg-color-button-principal={selectedVariants.color === color.value}
                  class:text-white={selectedVariants.color === color.value}
                  class:bg-white={selectedVariants.color !== color.value}
                  class:text-gray-700={selectedVariants.color !== color.value}
                  on:click={() => selectedVariants.color = color.value}
                >
                  {color.value}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if product.variants.flavors && product.variants.flavors.length > 0}
          <div class="relative">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Sabor:
            </label>
            <div class="grid grid-cols-3 gap-2">
              {#each product.variants.flavors as flavor}
                <button
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  class:bg-color-button-principal={selectedVariants.flavor === flavor.value}
                  class:text-white={selectedVariants.flavor === flavor.value}
                  class:bg-white={selectedVariants.flavor !== flavor.value}
                  class:text-gray-700={selectedVariants.flavor !== flavor.value}
                  on:click={() => selectedVariants.flavor = flavor.value}
                >
                  {flavor.value}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Cantidad:
          </label>
          <div class="flex items-center space-x-2">
            <button
              on:click={decrementQuantity}
              class="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <span class="text-gray-600 text-lg">−</span>
            </button>
            
            <input
              type="number"
              min="1"
              bind:value={quantity}
              on:change={updateQuantity}
              class="block w-20 text-center rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            
            <button
              on:click={incrementQuantity}
              class="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <span class="text-gray-600 text-lg">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-4">
      <button
        on:click={addToCart}
        class="bg-color-button-principal text-white px-2 py-3 rounded-lg hover:bg-purple-400 active:bg-purple-500 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold shadow-md hover:shadow-lg"
      >
        <span class="text-base">Agregar al </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>

      <button
        on:click={buyNow}
        class="bg-color-button-cuarto hover:bg-lime-400 active:bg-lime-500 text-white px-2 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold shadow-md hover:shadow-lg"
      >
        <span class="text-base">Comprar</span> 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
  </div>
</div>

<BuyConfirmationModal
  bind:show={showBuyModal}
  product={{
    productId: product.id,
    name: product.name,
    price: finalPrice,
    quantity,
    selectedVariants
  }}
  cartItems={cartItems}
  {whatsappNumber}
  onClose={() => showBuyModal = false}
/>

<SizeGuideModal
  bind:show={showSizeGuide}
  onClose={() => showSizeGuide = false}
  brand={product.marca || ''}
/>

<style>
  @media (max-width: 768px) {
    .scale-102 {
      transform: scale(1.02);
    }
  }

  :global(.svelte-hmr-skip-transitions) {
    transition: none !important;
    animation: none !important;
  }
</style>