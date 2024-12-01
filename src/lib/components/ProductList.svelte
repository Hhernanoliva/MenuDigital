<script lang="ts">
  import { cart } from '$lib/stores/cart';
  import { fly } from 'svelte/transition';
  import type { Product } from '$lib/types/product';
  import { onMount } from 'svelte';

  export let products: Product[];
  export let whatsappNumber: string;

  let quantities: Record<string, number> = {};

  onMount(() => {
    // Initialize quantities for all products
    products.forEach(product => {
      quantities[product.id] = 1;
    });
  });

  function formatPrice(price: number): string {
    return price.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    });
  }

  function addToCart(product: Product) {
    const quantity = quantities[product.id] || 1;
    cart.addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity
    });
  }

  function updateQuantity(productId: string, value: number) {
    quantities[productId] = value;
  }

  // Group products by category
  $: groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
</script>

<div class="space-y-8 mt-8">
  {#each Object.entries(groupedProducts) as [category, categoryProducts], categoryIndex}
    <div 
      class="bg-white rounded-xl shadow-lg p-6"
      in:fly={{ y: 20, duration: 300, delay: categoryIndex * 100 }}
    >
      <h2 class="text-2xl font-bold mb-6 color-font-principal capitalize">{category}</h2>
      
      <div class="space-y-6">
        {#each categoryProducts as product, productIndex}
          <div 
            class="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 rounded-lg"
            in:fly={{ x: 20, duration: 300, delay: productIndex * 50 }}
          >
            <div class="sm:w-1/4">
              <img 
                src={product.image || 'https://placehold.co/400x300'} 
                alt={product.name}
                class="w-full aspect-video object-cover rounded-lg"
              />
            </div>
            
            <div class="flex-1 space-y-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-bold">{product.name}</h3>
                  {#if product.description}
                    <p class="text-gray-600 mt-1">{product.description}</p>
                  {/if}
                </div>
                <div class="text-right">
                  <span class="text-2xl font-bold color-font-principal">
                    {formatPrice(product.price)}
                  </span>
                  <div class="mt-1">
                    {#if product.stock}
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Disponible
                      </span>
                    {:else}
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        No disponible
                      </span>
                    {/if}
                  </div>
                </div>
              </div>
              
              {#if product.stock}
                <div class="flex items-center gap-4">
                  <div class="flex items-center">
                    <label for={`quantity-${product.id}`} class="sr-only">Cantidad</label>
                    <select
                      id={`quantity-${product.id}`}
                      bind:value={quantities[product.id]}
                      on:change={(e) => updateQuantity(product.id, parseInt(e.currentTarget.value))}
                      class="block w-20 rounded-md border-gray-300 py-1.5 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    >
                      {#each Array(10) as _, i}
                        <option value={i + 1}>{i + 1}</option>
                      {/each}
                    </select>
                  </div>
                  
                  <button
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-color-button-principal hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                    on:click={() => addToCart(product)}
                  >
                    Agregar al pedido
                  </button>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>