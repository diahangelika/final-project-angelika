<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div
        class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center"
      >
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Product</p>
          <p class="my-0 text-secondary">Add your product here</p>
        </div>
        <div>
          <button
            class="btn add-btn px-3 py-2 rounded-pill"
            @click="goToAddProduct"
          >
            <i class="fa-solid fa-circle-plus pe-2"></i>Add Product
          </button>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Product</p>
      <div class="row">
        <user-product-card
          v-for="produk in popularproducts"
          :key="produk.id"
          :produk="produk"
          :buttonName="['Delete', 'Edit']"
          @btnRemove="deleteProduct(produk.id)"
          @btnEdit="updateProduct(produk.id)"
        >
          <p>{{ moment(produk.createdAt).format("YYYY-MM-DD") }}</p>
        </user-product-card>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const popularproducts = computed(() => {
  return store.state.popularproduct.popularproducts;
});

onMounted(async () => {
  try {
    await store.dispatch("popularproduct/getPopularProductData");
  } catch (error) {
    console.log(error);
  }
});

import UserProductCard from "./UserProductCard.vue";

import { useRouter } from "vue-router";
import moment from "moment";
const router = useRouter();

const goToAddProduct = () => {
  router.push("/new-product");
};

const deleteProduct = async (id) => {
  await store.dispatch("popularproduct/deleteProduct", id);
};

const updateProduct = (id) => {
  const uid = isNaN(Number(id));

  router.push({ name: "editProductPage", params: { id: uid ? `${id}` : id } });
};


</script>
