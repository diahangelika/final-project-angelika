<template>
  <div class="d-flex flex-wrap justify-content-start">
    <div v-for="brand in uniqueBrands" :key="brand">
      <button 
        class="btn btn-outline-danger m-1" 
        @click="filterByBrand(brand)">
        {{ brand }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const uniqueBrands = computed(() => {
  const products = store.state.popularproduct.popularproducts;
  return [...new Set(products.map((product) => product.brand))];
});

const filterByBrand = (brand) => {
  router.push({ name: 'allItem', query: { brand } });
};
</script>
