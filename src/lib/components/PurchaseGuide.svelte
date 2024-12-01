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
				<div class="flex-1 min-w-0">
					<h2 class="text-base sm:text-lg font-medium text-gray-800 leading-tight">¿Cómo comprar?</h2>
					<p class="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-2">Guía rápida para realizar tu compra</p>
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
			<div class="pt-4 space-y-4 sm:space-y-6">
				<div class="grid grid-cols-1 gap-3">
					<div class="relative bg-primary/5 rounded-lg  transition-all duration-300 hover:bg-primary/10">
						<div class="flex items-center gap-2 sm:gap-3">
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
								<span class="text-lg color-font-principal font-bold">1</span>
							</div>
							<div class="min-w-0">
								<h3 class="text-sm font-medium text-gray-800 mb-0.5">Elegí tu producto</h3>
								<p class="text-xs text-gray-600 leading-relaxed">Seleccioná el talle, color y cantidad deseada.</p>
							</div>
						</div>
					</div>
					
					<div class="relative bg-primary/5 rounded-lg pt-2 transition-all duration-300 hover:bg-primary/10">
						<div class="flex items-center gap-2 sm:gap-3">
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
								<span class="text-lg color-font-principal font-bold">2</span>
							</div>
							<div class="min-w-0">
								<h3 class="text-sm font-medium text-gray-800 mb-0.5">Contactanos por WhatsApp</h3>
								<p class="text-xs text-gray-600 leading-relaxed">Hacé clic en "Comprar" y te redirigiremos a WhatsApp para coordinar el pago.</p>
							</div>
						</div>
					</div>
					
					<div class="relative bg-primary/5 rounded-lg pt-2 transition-all duration-300 hover:bg-primary/10">
						<div class="flex items-center gap-2 sm:gap-3">
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
								<span class="text-lg color-font-principal font-bold">3</span>
							</div>
							<div class="min-w-0">
								<h3 class="text-sm font-medium text-gray-800 mb-0.5">Elegí tu método de pago</h3>
								<p class="text-xs text-gray-600 leading-relaxed">Podés pagar por transferencia bancaria o mediante Mercado Pago.</p>
							</div>
						</div>
					</div>

					<div class="relative bg-primary/5 rounded-lg py-2 transition-all duration-300 hover:bg-primary/10">
						<div class="flex items-center gap-2 sm:gap-3">
							<div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
								<span class="text-lg color-font-principal font-bold">4</span>
							</div>
							<div class="min-w-0">
								<h3 class="text-sm font-medium text-gray-800 mb-0.5">Envío</h3>
								<p class="text-xs text-gray-600 leading-relaxed">El envío se realiza por Correo Argentino y está a cargo del comprador.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>