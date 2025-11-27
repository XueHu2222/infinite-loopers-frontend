<script>
	import logo from '$lib/assets/Logo.png';
</script>

<footer class="flex h-16 w-full items-center justify-between bg-[#EEE9E1] px-3 font-['Inter',sans-serif] text-sm text-[#4F3117] sm:h-20 sm:px-8">
	<nav class="flex items-center gap-3 sm:gap-6">
		<a href="/" class="flex cursor-pointer items-center gap-1 transition hover:text-[#3E2612]">
			<img src={logo} alt="Logo" class="h-6 w-6 sm:h-9 sm:w-9" />
			<div class="font-['Amita',cursive] text-base font-semibold text-[#4F3117] sm:text-xl">
				Quest Giver
			</div>
		</a>

		<a href="/about" class="cursor-pointer transition hover:text-[#3E2612] font-medium text-xs sm:text-base">
			About
		</a>

		<a href="/blog" class="cursor-pointer transition hover:text-[#3E2612] font-medium text-xs sm:text-base">
			Blog
		</a>
	</nav>

	<!-- Social media links -->
	<div class="flex gap-3 sm:gap-4">
		<a href="https://instagram.com/" aria-label="Instagram" class="cursor-pointer transition hover:text-[#3E2612]">
			<svg xmlns="http://www.w3.org/2000/svg"
				 class="h-4 w-4 sm:h-5 sm:w-5"
				 viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 2.95.272.16 3.062 0 7.164.014 8.444 0 8.853 0 12c0 3.147.014 3.556.072 4.836.2 4.102 2.99 6.892 7.092 7.092 1.28.058 1.689.072 4.836.072 3.146 0 3.556-.014 4.836-.072 4.102-.2 6.892-2.99 7.092-7.092.058-1.28.072-1.689.072-4.836 0-3.147-.014-3.556-.072-4.836C23.728 2.95 20.938.16 16.836 0 15.556-.014 15.147 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
			</svg>
		</a>

		<a href="https://linkedin.com/" aria-label="LinkedIn" class="cursor-pointer transition hover:text-[#3E2612]">
			<svg xmlns="http://www.w3.org/2000/svg"
				 class="h-4 w-4 sm:h-5 sm:w-5"
				 viewBox="0 0 24 24" fill="currentColor">
				<path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204s1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
			</svg>
		</a>

		<a href="https://x.com/" aria-label="X" class="cursor-pointer transition hover:text-[#3E2612]">
			<svg xmlns="http://www.w3.org/2000/svg"
				 class="h-4 w-4 sm:h-5 sm:w-5"
				 viewBox="0 0 24 24" fill="currentColor">
				<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM17.61 20.644h2.039L6.486 3.24H4.298l13.312 17.404z"/>
			</svg>
		</a>
	</div>
</footer>
