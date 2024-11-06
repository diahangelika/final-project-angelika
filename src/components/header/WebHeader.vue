<template>
    <header class="bg-light py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/" class="navbar-brand">
          <img src="../../assets/images/logo.png" alt="Logo" width="150" style="border-radius: 10px;">
      </router-link>
      <search-menu></search-menu>
      <div>
        <navigation-bar></navigation-bar>
      </div>
    </div>
  </header>
</template>

<script setup>
  import NavigationBar from './NavigationBar.vue';
  import SearchMenu from './SearchMenu.vue';
</script>