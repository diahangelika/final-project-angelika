<template>
  <hero-section></hero-section>
  <div class="container my-5">
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 15px; align-items: center;">
        <h3>Popular Items</h3>
        <router-link to="allitem" style="color: palevioletred; text-decoration: none;">See All</router-link>
    </div>
   
    <popular-product-list :popularproducts="popularProductList.slice(0, 4)" v-if="popularProductListStatus">

    </popular-product-list>
    <see-all></see-all>

    <section class="my-5">
      <h3>Shop by Brand</h3>
      <brand-list></brand-list>
    </section>

        <popular-product-list :popularproducts="popularProductList.slice(5, 9)" v-if="popularProductListStatus">

        </popular-product-list> 
    
        <see-all></see-all>
  </div>
</template>

<script setup>
  import HeroSection from './HeroSection.vue';
  import PopularProductList from '../product/PopularProductList.vue';
  import BrandList from '../product/BrandList.vue';
  import SeeAll from '../product/SeeAll.vue';

  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const popularProductListStatus = ref(false);
  const popularProductList = ref();

  onMounted(async () => {
    try{
      await store.dispatch("popularproduct/getPopularProductData");
      popularProductListStatus.value = true;
      popularProductList.value = store.state.popularproduct.popularproducts;
    } catch (error) {
      console.log(error);
    }
  })
</script>