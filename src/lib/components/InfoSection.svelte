<script>
	let expanded = false;
</script>

<div class="bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 mb-6 transition-all duration-300 hover:shadow-md mx-2 sm:mx-0">
	<div class="p-4 sm:p-5">
		<div 
			class="flex items-start sm:items-center justify-between cursor-pointer select-none gap-3" 
			on:click={() => expanded = !expanded}
			role="button"
			tabindex="0"
			aria-expanded={expanded}
			on:keydown={(e) => e.key === 'Enter' && (expanded = !expanded)}
		>
			<div class="flex items-start gap-3 flex-1">
				<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
					<svg class="w-4 h-4 sm:w-5 sm:h-5 color-font-principal" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<div class="flex-1 min-w-0">
					<h2 class="text-base sm:text-lg font-medium text-gray-800 leading-tight">¿Por qué elegir un Pretal en H?</h2>
					<p class="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-2">Descubre sus beneficios para tu mascota</p>
				</div>
			</div>
			
			<div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
				<span class="text-xs sm:text-sm color-font-principal font-medium hidden sm:inline">
					{expanded ? 'Mostrar menos' : 'Leer más'}
				</span>
				<div class="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center">
					<svg
						class="w-4 h-4 color-font-principal transform transition-transform duration-300 ease-out {expanded ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</div>
		
		<div 
			class="overflow-hidden transition-all duration-300 ease-in-out"
			style="max-height: {expanded ? '1000px' : '0px'}"
		>
			<div class="pt-4 sm:pt-5 space-y-4 sm:space-y-6">
				<div class="pl-10 sm:pl-11">
					<p class="text-xs sm:text-sm text-gray-600 leading-relaxed">
						Los pretales en H son la opción más segura y cómoda para tu perro. Distribuyen la presión uniformemente,
						evitando lesiones en el cuello y permitiendo un mejor control durante los paseos.
					</p>
				</div>
				
				<div class="grid grid-cols-1 gap-3 pl-10 sm:pl-11">
					<div class="relative bg-primary/5 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:bg-primary/10">
						<div class="flex items-center gap-2 sm:gap-3">
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
								<p class="text-4xl color-font-principal">&#8226;</p>
							</div>
							<div class="min-w-0">
								<h3 class="text-sm font-medium text-gray-800 mb-0.5">Mayor Comodidad</h3>
								<p class="text-xs text-gray-600 leading-relaxed">Diseño ergonómico que se adapta naturalmente al cuerpo de tu mascota.</p>
							</div>
						</div>
					</div>
					
					<div class="relative bg-primary/5 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:bg-primary/10">
						<div class="flex items-center gap-2 sm:gap-3">
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
								<p class="text-4xl color-font-principal">&#8226;</p>
							</div>
							<div class="min-w-0">
								<h3 class="text-sm font-medium text-gray-800 mb-0.5">Mejor Control</h3>
								<p class="text-xs text-gray-600 leading-relaxed">Control óptimo y seguro durante los paseos diarios.</p>
							</div>
						</div>
					</div>
					
					<div class="relative bg-primary/5 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:bg-primary/10">
						<div class="flex items-center gap-2 sm:gap-3">
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
								<p class="text-4xl color-font-principal">&#8226;</p>
							</div>
							<div class="min-w-0">
								<h3 class="text-sm font-medium text-gray-800 mb-0.5">Previene Lesiones</h3>
								<p class="text-xs text-gray-600 leading-relaxed">Evita la presión en zonas sensibles del cuello.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>