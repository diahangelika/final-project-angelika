<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<template>
  <div>
    <web-header></web-header>
    <router-view></router-view>
    <web-footer></web-footer>
  </div>
  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup>
  import WebHeader from './components/header/WebHeader.vue';
  import HomePage from './components/pages/HomePage.vue';
  import WebFooter from './components/footer/WebFooter.vue';
</script>
