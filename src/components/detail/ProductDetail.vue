<template>
  <product-detail-content
    :relatedProducts="relatedProduct"
    :detailProduct="detailProduct"
  ></product-detail-content>
</template>

<script setup>
import ProductDetailContent from "./ProductDetailContent.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const relatedProduct = ref([]);
const detailProduct = ref(null);

onMounted(async () => {
  const produkDetail = await store.dispatch(
    "popularproduct/getPopularProductDetail",
    route.params.id
  );
  const result = await store.dispatch("popularproduct/getPopularProductData");

  // if (produkDetail && result?.length > 0) {
  //   relatedProduct.value = result.filter(
  //     (product) => product.category === produkDetail.category 
  //   );
  // }

  detailProduct.value = produkDetail;

  console.log(
    "PopularproductDetail:",
    store.state.popularproduct.popularproductsDetail
  );
  console.log("popularproducts:", store.state.popularproduct.popularproducts);
});
</script>
