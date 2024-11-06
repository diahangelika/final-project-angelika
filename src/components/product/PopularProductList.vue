<template>
<div class="container my-5">
  <section>
      <div class="row">
        <div class="col-md-2 product-card" style="overflow: hidden;"
            v-for="produkpopuler in popularproducts" :key="produkpopuler.id">

          <router-link :to="`/popularproduct/${produkpopuler.id}`" class="card text-decoration-none" style="height: auto; border: none;">
            <img :src="produkpopuler?.imageLink || 'https://via.placeholder.com/150'" 
                  alt="Product 1" 
                  style="height: 197px; width: 195px;">

              <div class="haha-1" style="display: flex; flex-direction: column; text-align: left;">
                  <div style="font-weight: bold; color: palevioletred; margin-top: 5px; margin-bottom: 0; font-size: 17px; ">{{ formatRupiah(produkpopuler.price) }}</div>
                  <div style="font-size: 15px; margin: 5px 0;">{{produkpopuler.title}}</div>
              </div>
                                
              <div class="haha-2" style="display: flex; flex-direction: row; justify-content: space-between;">
                <div>{{ produkpopuler.bm }}</div>
                <div><span class="fa fa-heart-o"></span>{{ produkpopuler.likes }}</div>
              </div>
          </router-link>
        </div>
      </div>
  </section>
</div>
</template>

<script setup>
  import popularproduct from '../../store/popularproduct';
  import { computed, reactive } from 'vue';
  import { useStore } from 'vuex';
  import { defineProps } from 'vue';

  const store = useStore()

  // const popularproducts = computed(() => {
  //   return store.state.popularproduct.popularproducts
  // })
  const props = defineProps({
    popularproducts: {
    type: Array,
    },
  });

  function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  }
    
</script>

<style>
.product-card img {
  width: 100%;
  height: auto;
}
.product-card {
  text-align: center;
  margin-bottom: 20px;
}
.see-all {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.see-all .btn {
  margin-top: 20px;
}
</style>