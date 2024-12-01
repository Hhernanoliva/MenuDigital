<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import type { Category } from '$lib/types/product';
  
  export let categories: Category[];
  export let selectedCategory: string;
  
  let isExpanded = true;
  let hasScrolled = false;
  
  function handleScroll() {
    hasScrolled = window.scrollY > 50;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<div class="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm">
  <div class="px-4 py-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <button
        class="relative aspect-video rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        class:ring-2={selectedCategory === 'all'}
        class:ring-purple-500={selectedCategory === 'all'}
        on:click={() => selectedCategory = 'all'}
      >
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"></div>
        <img
          src="https://placehold.co/400x300"
          alt="Todos"
          class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <span class="absolute bottom-2 left-2 text-white font-medium z-20">Todos</span>
      </button>

      {#each categories as category}
        <button
          class="relative aspect-video rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          class:ring-2={selectedCategory === category.name}
          class:ring-purple-500={selectedCategory === category.name}
          on:click={() => selectedCategory = category.name}
        >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"></div>
          <img
            src={category.image}
            alt={category.name}
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <span class="absolute bottom-2 left-2 text-white font-medium z-20 capitalize">
            {category.name}
          </span>
        </button>
      {/each}
    </div>
  </div>
</div>