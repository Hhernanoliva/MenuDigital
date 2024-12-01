<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  
  export let categories: string[];
  export let selectedCategory: string;
  
  let isExpanded = true;
  let hasScrolled = false;
  
  function handleScroll() {
    hasScrolled = window.scrollY > 360;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<div class="sticky top-0 z-40 -mx-4 sm:-mx-6 lg:-mx-8" id="barraSuperior">
  <div 
    class="transition-all duration-300"
    class:translate-y-0={isExpanded}
    class:shadow-md={hasScrolled && isExpanded}
    class:-translate-y-full={!isExpanded}
  >
    <div 
      class="px-4 sm:px-6 lg:px-8 py-4 transition-colors duration-300"
      class:bg-white={hasScrolled}
      class:backdrop-blur-lg={hasScrolled}
    >
      {#if isExpanded}
        <div 
          class="flex justify-center mb-2"
          transition:slide={{ duration: 200 }}
        >
          <div class="inline-flex rounded-md shadow-sm">
            {#each categories as category}
              <button
                class="px-4 py-2 text-sm font-medium transition-all duration-200 {
                  selectedCategory === category 
                    ? 'bg-color-button-principal text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-r last:border-r-0 first:rounded-l-md last:rounded-r-md"
                on:click={() => selectedCategory = category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>

<!-- <div id="botonColaps"
  class="absolute left-1/2 -translate-x-1/2 translate-y-full {isExpanded ? 'bottom-6' : 'bottom-8'}"
  transition:fade={{ duration: 200 }}
>
  <button
    class="bg-white shadow-lg rounded-b-lg px-4 py-2 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
    on:click={() => isExpanded = !isExpanded}
  >
    <svg 
      class="w-4 h-4 transition-transform duration-200 {isExpanded ? 'rotate-180' : ''}"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
</div> -->

<div id="botonColapsIzquierdo"
  class="fixed left-0 bottom-6 transform translate-y-0 pl-3"
  transition:fade={{ duration: 200 }}
>
  <button
    class="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
    on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <svg 
      class="w-4 h-4 transition-transform duration-200"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M5 15l7-7 7 7"
      />
    </svg>
  </button>
</div>



</div>

<style>
  :global(main) {
    padding-bottom: 2.5rem;
  }
</style>