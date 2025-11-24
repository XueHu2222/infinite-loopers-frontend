<script>
      import { page } from '$app/stores';
      import { onMount } from 'svelte';
      import logo from '$lib/assets/logo.png';

      export let items = [];

      $: currentPath = $page.url.pathname;

      let user = null;

      // Check if user is logged in when component mounts
      onMount(() => {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
              user = JSON.parse(storedUser);
          }
      });

      // Logout function
      function handleLogout() {
          localStorage.removeItem('user');
          user = null;
          window.location.href = '/signin';
      }
  </script>

  <header class="flex w-full items-center justify-between bg-[#EEE9E1] px-6 py-5">
      <div class="flex items-center gap-3">
          <img src={logo} alt="Logo" class="h-8 w-8" />
          <div class="text-xl font-bold text-[#4F3117]">Quest Giver</div>
      </div>

      <div class="flex items-center gap-6">
          <nav class="flex items-center gap-6">
              {#each items as item}
                  <a
                      href={item.href}
                      class="px-1 text-lg
                          {currentPath === item.href
                              ? 'font-semibold text-[#3E2612]'
                              : 'text-[#4F3117] hover:text-[#7A5C3E]'}"
                  >
                      {item.label}
                  </a>
              {/each}
          </nav>

          <div class="flex items-center gap-3">
              {#if user}
                  <!-- Show when logged in -->
                  <span class="font-medium text-[#4F3117]">
                      Welcome, {user.username}!
                  </span>
                  <button
                      on:click={handleLogout}
                      class="rounded bg-[#4F3117] px-4 py-1 font-medium text-[#EEE9E1]
  hover:bg-[#3E2612]"
                  >
                      Logout
                  </button>
              {:else}
                  <!-- Show when not logged in -->
                  <a
                      href="/signup"
                      class="rounded border-2 border-[#4F3117] bg-[#EEE9E1] px-4 py-1 font-medium
  text-[#4F3117] hover:bg-[#E5DFD3]"
                  >
                      Sign Up
                  </a>

                  <a
                      href="/signin"
                      class="rounded bg-[#4F3117] px-4 py-1 font-medium text-[#EEE9E1]
  hover:bg-[#3E2612]"
                  >
                      Login
                  </a>
              {/if}
          </div>
      </div>
  </header>