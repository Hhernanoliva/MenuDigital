<script lang="ts">
  import { scale } from 'svelte/transition';
  import { inView } from 'motion';

  const whatsappNumber = '+1234567890'; // Replace with actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const currentYear = new Date().getFullYear();
</script>


<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 " >
  <div class="w-full flex justify-center mb-4">
    <img class="max-w-64" src="https://rstr.in/xhy241m7cri4uc/somospepes/MBaKGcPgOnW" alt="Pet Shop Logo" />
  </div>
  <div class="w-full flex justify-center max-w-sm mx-auto text-center mb-10 font-semibold">
    <h1>Kits de paseos que cuidan el bienestar y la seguridad de tu perro</h1>
  </div>

  <div class="grid gap-8 max-w-md mx-auto">
    <a 
      href="/catalog"
      class="transform hover:scale-105 transition-transform duration-300"
      in:scale={{ duration: 300, delay: 150 }}
    >
      <div class="bg-color-button-principal text-white rounded-lg shadow-lg p-4 text-center">
        <h2 class="font-semibold">Catalogo de productos</h2>
        <p class="mt-1">Correas, pretales y accesorios</p>
      </div>
    </a>
    
    <a 
      href="https://drive.google.com/file/d/1rjTfYlR5BnyCkkqHDiIPmw02ZxO4sYaD/view"
      class="transform hover:scale-105 transition-transform duration-300"
      in:scale={{ duration: 300, delay: 300 }}
    >
      <div class="bg-color-button-secundario text-white rounded-lg shadow-lg p-4 text-center">
        <h2 class="font-semibold">Recursos para mascotas</h2>
        <p class="mt-1">Consejos y guías para el cuidado de tu mascota</p>
      </div>
    </a>

    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      class="transform hover:scale-105 transition-transform duration-300"
      in:scale={{ duration: 300, delay: 450 }}
    >
      <div class="bg-color-button-tercero text-white rounded-lg shadow-lg p-4 text-center">
        <h2 class="font-semibold">Contactame</h2>
        <p class="mt-1">Chateá conmigo por WhatsApp</p>
      </div>
    </a>
  </div>
</div>

<style>
  h1{
    font-size: 1.5rem;
    color: #2A2A2A;
  }
  h2 {
    font-size: 1.4rem;
  }
  p {
    font-size: 1rem;
  }
</style>