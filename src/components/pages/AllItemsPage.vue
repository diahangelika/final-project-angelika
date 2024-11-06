<template>
  <div class="container my-5">
    <section class="my-5">
      <h3>All Items</h3>
      <popular-product-list :popularproducts="filteredProducts" v-if="popularProductListStatus">
      </popular-product-list>
    </section>

    <div v-if="popularProductListStatus && filteredProducts.length === 0">
        <not-found-page></not-found-page>
      </div>
  </div>
</template>

<script setup>
import PopularProductList from '../product/PopularProductList.vue';
import NotFoundPage from './NotFoundPage.vue';

import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();
const popularProductListStatus = ref(false);
const popularProductList = ref([]);
const searchQuery = ref(route.query.search || '');
const brandQuery = ref(route.query.brand || '');

onMounted(async () => {
  try {
    await store.dispatch("popularproduct/getPopularProductData");
    popularProductListStatus.value = true;
    popularProductList.value = store.state.popularproduct.popularproducts;
  } catch (error) {
    console.log(error);
  }
});

watch(() => route.query.search, (newSearchQuery) => {
  searchQuery.value = newSearchQuery || '';
});

watch(() => route.query.brand, (newBrandQuery) => {
  brandQuery.value = newBrandQuery || '';
});

const filteredProducts = computed(() => {
  let products = popularProductList.value;

  if (searchQuery.value) {
    products = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (brandQuery.value) {
    products = products.filter(product =>
      product.brand === brandQuery.value
    );
  }

  return products;
});
</script>
