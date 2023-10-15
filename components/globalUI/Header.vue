<template>
  <header
    class="w-full shadow-md h-20"
    :class="countries.darkTheme ? 'dark:bg-country-darkBlue' : ''"
  >
    <nav class="max-w-screen-xl m-auto flex justify-between h-full px-3">
      <h1 class="font-bold self-center text-xl">
        <NuxtLink :href="`/`"> Where in the world?</NuxtLink>
      </h1>

      <aside
        @click="countries.darkTheme = !countries.darkTheme"
        class="cursor-pointer self-center flex gap-2"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </span>
        <h2 class="text-medium">
          {{ countries.darkTheme ? "Light" : "Dark" }} Mode
        </h2>
      </aside>
    </nav>
  </header>
</template>

<script>
import { countries } from "~/composables/store";
</script>

<style lang="css" scoped></style>
