<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { page } from '$app/stores';
  
  export let show = false;
  export let onClose: () => void;
  export let brand: string = '';
  
  // Normalize brand name to match the keys in sizeTables
  $: normalizedBrand = brand?.toLowerCase().trim().replace(/[&\s]/g, '') || '';
  $: sizeTableKey = normalizedBrand === 'chco' ? 'ch&co' : 
                    normalizedBrand === 'porotos' ? 'porotos' : '';
  $: sizeTable = $page.data.sizeTables?.[sizeTableKey] || [];
  
  function handleClickOutside(event: MouseEvent) {
    const modal = event.target as HTMLElement;
    if (modal.classList.contains('modal-backdrop')) {
      onClose();
    }
  }
</script>

{#if show}
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center modal-backdrop overflow-y-auto"
    on:click={handleClickOutside}
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl transform my-4"
      transition:scale={{ duration: 200 }}
    >
      <div class="p-4">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg sm:text-xl font-bold color-font-principal">Guía de Talles - {brand[0].toUpperCase() + brand.slice(1)}</h2>
          <button
            class="text-gray-400 hover:text-gray-600 transition-colors"
            on:click={onClose}
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          {#if sizeTable.length > 0}
            <div class="overflow-x-auto rounded-lg border border-gray-200">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    {#each Object.keys(sizeTable[0]) as header}
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                      </th>
                    {/each}
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {#each sizeTable as row}
                    <tr class="hover:bg-gray-50">
                      {#each Object.values(row) as cell}
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {cell}
                        </td>
                      {/each}
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="bg-purple-50 rounded-lg p-3 text-xs text-purple-800">
                  Tu compañero debe estar parado para medir correctamente.
                </div>
                <div class="bg-gray-50 rounded-lg p-3">
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <h4 class="font-medium mb-1">Cuello</h4>
                      <p class="text-xs text-gray-600">Medir dejando espacio para 2 dedos.</p>
                    </div>
                    <div>
                      <h4 class="font-medium mb-1">Pecho</h4>
                      <p class="text-xs text-gray-600">Medir detrás de patas delanteras.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="relative">
                <img 
                  src="info-perro.png" 
                  alt="Guía de medición" 
                  class="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            <div class="bg-blue-50 p-3 rounded-lg">
              <p class="text-xs text-blue-800">
                <span class="font-medium">Nota:</span> Medidas aproximadas. Consulta con nosotros ante cualquier duda.
              </p>
            </div>
          {:else}
            <div class="text-center py-6">
              <p class="text-gray-500">No hay información de tallas disponible para la marca {brand}.</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Prevent body scroll when modal is open */
  :global(body:has(.modal-backdrop)) {
    overflow: hidden;
  }

  .modal-backdrop {
    padding: 1rem;
  }

  @media (min-width: 640px) {
    .modal-backdrop {
      padding: 2rem;
    }
  }
</style>