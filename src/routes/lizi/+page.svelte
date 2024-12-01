<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let visible = false;
  
  onMount(() => {
    visible = true;
  });

  function callOwner() {
    window.location.href = 'tel:+1234567890';
  }

  function openWhatsApp() {
    window.location.href = 'https://wa.me/1234567890?text=Hola,%20encontré%20a%20tu%20mascota';
  }
</script>

<svelte:head>
  <title>Luna - Pet Profile</title>
  <meta name="description" content="Pet profile for Luna" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-groovy-purple/30 via-groovy-blue/20 to-groovy-orange/30 p-6 relative overflow-hidden">
  <!-- Animated background circles -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>
  </div>

  {#if visible}
    <div 
      class="max-w-md mx-auto glass-card backdrop-blur-xl rounded-3xl overflow-hidden relative z-10"
      transition:fly="{{ y: 50, duration: 1000 }}"
    >
      <!-- Profile Header -->
      <div class="relative">
        <div class="w-48 h-48 mx-auto mt-8 relative z-20 animate-float">
          <div class="glow-effect"></div>
          <img
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
            alt="Luna's Profile"
            class="w-full h-full object-cover rounded-full border-4 border-white/30 shadow-lg"
            transition:fade="{{ duration: 1000 }}"
          />
        </div>
      </div>

      <!-- Pet Info -->
      <div class="px-6 py-8 text-center">
        <h1 
          class="text-4xl font-bold mb-2 text-white glow-text"
          in:fly="{{ y: 20, duration: 800, delay: 300 }}"
        >
          Luna
        </h1>
        
        <div 
          class="space-y-4 mb-8"
          in:fly="{{ y: 20, duration: 800, delay: 600 }}"
        >
          <p class="text-white/90">Golden Retriever • 3 años</p>
          <p class="text-white/90">Dueño: Juan Pérez</p>
          <p class="text-white/90">Dirección: Av. Siempreviva 742</p>
        </div>

        <!-- Contact Buttons -->
        <div 
          class="space-y-4"
          in:fly="{{ y: 20, duration: 800, delay: 900 }}"
        >
          <button
            on:click={callOwner}
            class="glass-button w-full py-3 px-6 text-white rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Llamar al dueño</span>
          </button>

          <button
            on:click={openWhatsApp}
            class="glass-button-green w-full py-3 px-6 text-white rounded-full transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
            </svg>
            <span>Contactar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Glassmorphism */
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .glass-button {
    background: rgba(78, 165, 217, 0.2);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .glass-button-green {
    background: rgba(34, 197, 94, 0.2);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  /* Animated background circles */
  .circle-1, .circle-2, .circle-3 {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: float 10s infinite;
  }

  .circle-1 {
    width: 300px;
    height: 300px;
    background: rgba(255, 107, 53, 0.3);
    top: -50px;
    right: -50px;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    background: rgba(139, 95, 191, 0.3);
    bottom: -100px;
    left: -100px;
    animation-delay: -3s;
  }

  .circle-3 {
    width: 200px;
    height: 200px;
    background: rgba(78, 165, 217, 0.3);
    top: 50%;
    right: 30%;
    animation-delay: -6s;
  }

  /* Glow effects */
  .glow-text {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .glow-effect {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2), transparent 70%);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.4;
    }
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.05);
    }
  }

  /* Smooth transitions */
  button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(31, 38, 135, 0.4);
  }

  /* Ensure proper stacking and overflow */
  :global(body) {
    overflow-x: hidden;
    background: #1a1a1a;
  }
</style>