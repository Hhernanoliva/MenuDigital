<script lang="ts">
  import '../app.css';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';
   const currentYear = new Date().getFullYear();
</script>

<div class="min-h-screen bg-gray-50">
  <!-- <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-8 w-auto" src="/logo.svg" alt="Pet Shop Logo" />
          </div>
        </div>
      </div>
    </div>
  </nav> -->

  <main>
    {#key $page.url.pathname}
      <div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
        <slot />
      </div>
    {/key}
  </main>

  <footer class="bg-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <p class="text-center text-gray-500">© Somos Pepés {currentYear}</p>
    </div>
  </footer>
</div>