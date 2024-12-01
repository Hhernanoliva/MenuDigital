<script lang="ts">
  import { fly } from 'svelte/transition';
  
  export let resource: {
    title: string;
    description: string;
    image: string;
  };
  export let index: number;
</script>

<div
  class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
  in:fly={{ y: 20, duration: 300, delay: index * 100 }}
>
  <img 
    src={resource.image} 
    alt={resource.title}
    class="w-full h-48 object-cover"
  />
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-2">{resource.title}</h2>
    <p class="text-gray-600">{resource.description}</p>
  </div>
</div>