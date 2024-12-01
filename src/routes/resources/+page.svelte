<script lang="ts">
  import ResourceCard from '$lib/components/ResourceCard.svelte';

  const resources = [
    {
      title: 'Pet Care Basics',
      description: 'Essential tips for new pet owners',
      image: 'https://placehold.co/400x300'
    },
    {
      title: 'Nutrition Guide',
      description: 'Understanding your pet\'s dietary needs',
      image: 'https://placehold.co/400x300'
    },
    {
      title: 'Training Tips',
      description: 'Professional advice for pet training',
      image: 'https://placehold.co/400x300'
    }
  ];
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h1 class="text-4xl font-bold text-center mb-12">Pet Care Resources</h1>

  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each resources as resource, i}
      <ResourceCard {resource} index={i} />
    {/each}
  </div>
</div>