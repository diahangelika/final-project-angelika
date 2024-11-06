<template>
  <main>
    <div class="container-md my-5 py-5">
      <product-form
        :detailData="detailData"
        v-if="detailData && !isLoading"
        :isEdit="true"
      >
      </product-form>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ProductForm from "../productForm/ProductForm.vue";

const store = useStore();
const route = useRoute();
const detailData = ref({});
let isLoading = false;

onMounted(async () => {
  try {
    isLoading = true;
    const productId = route.params.id;
    const response = await store.dispatch("popularproduct/getPopularProductDetail", productId);

    detailData.value = response;
    isLoading = false;
    console.log(response);
  } catch (error) {
    console.error("Failed to load product details:", error);
  }
  
});
</script>
