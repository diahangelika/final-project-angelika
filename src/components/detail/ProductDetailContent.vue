<template>
  <div class="row">
    <div class="col-8">
      <img
        :src="PopularproductDetail?.imageLink || '-'"
        alt=""
        style="
          height: 650px;
          width: 100%;
          object-fit: contain;
          margin-bottom: 50px;
        "
      />
      <div>
        <div class="row">
          <h2 style="margin-bottom: 40px">Related Products</h2>
          <div
            class="col-md-2 product-card"
            style="overflow: hidden"
            v-for="produkpopuler in relatedProducts"
            :key="produkpopuler.id"
          >
            <router-link
              :to="`/popularproduct/${produkpopuler.id}`"
              class="card text-decoration-none"
              style="height: auto; border: none"
            >
              <img
                :src="
                  produkpopuler?.imageLink || 'https://via.placeholder.com/150'
                "
                alt="Product 1"
                style="height: 197px; width: 195px"
              />

              <div
                class="haha-1"
                style="display: flex; flex-direction: column; text-align: left"
              >
                <div
                  style="
                    font-weight: bold;
                    color: palevioletred;
                    margin-top: 5px;
                    margin-bottom: 0;
                    font-size: 17px;
                  "
                >
                  {{ formatRupiah(produkpopuler.price )}}
                </div>
                <div style="font-size: 15px; margin: 5px 0">
                  {{ produkpopuler.title }}
                </div>
              </div>

              <div
                class="haha-2"
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                "
              >
                <div>{{ produkpopuler.bm }}</div>
                <div>
                  <span class="fa fa-heart-o"></span>{{ produkpopuler.likes }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="col-4">
      <div class="card" style="width: 18rem; margin-top: 100px">
        <div class="card-body">
          <div class="title-1">
            <h5 class="card-title">
              {{ formatRupiah(PopularproductDetail?.price )|| "-" }}
            </h5>
            <div><span class="fa fa-heart-o"></span></div>
          </div>
          <p class="card-text" style="margin-bottom: 0">
            {{ PopularproductDetail?.title || "-" }}
          </p>
          <p style="margin-top: 0; font-size: small">
            {{ PopularproductDetail?.pembagian || "-" }}
          </p>
          <hr />
          <ul class="list-group list-group-flush">
            <h6>Item Description</h6>
            <p class="card-text" style="margin-bottom: 20px">
              {{ PopularproductDetail?.description || "-" }}
            </p>
            <table>
              <tbody>
                <tr>
                  <td>Category</td>
                  <td>{{ PopularproductDetail?.category || "-" }}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{{ PopularproductDetail?.amount || "-" }} Items</td>
                </tr>
                <tr>
                  <td>Condition</td>
                  <td>{{ PopularproductDetail?.condition || "-" }}</td>
                </tr>
                <tr>
                  <td>color</td>
                  <td>{{ PopularproductDetail?.color || "-" }}</td>
                </tr>
                <tr>
                  <td>Uploaded</td>
                  <td>{{ formattedDate || "-" }}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>{{ PopularproductDetail?.shipping || "-" }}</td>
                </tr>
              </tbody>
            </table>
          </ul>
          <hr />
          <div
            class="card-body"
            style="display: flex; flex-direction: column; margin: 0; padding: 0"
          >
            <button
              type="button"
              class="btn btn-danger"
              style="margin-bottom: 5px"
            >
              Buy Now
            </button>
            <base-button type="button" class="btn btn-outline-danger" @click="addToCart(PopularproductDetail)">
              Add to Cart
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, watch, ref } from 'vue';
  import { useStore } from 'vuex';
  import BaseButton from '../ui/BaseButton.vue';

  function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  }

  const store = useStore();

  const PopularproductDetail = computed(() => {
    return store.state.popularproduct.popularproductsDetail;
  });

  const popularproducts = computed(() => {
    return store.state.popularproduct.popularproducts;
  });

  const relatedProducts = ref([]);

  watch([PopularproductDetail, popularproducts], ([newDetail, newProducts]) => {
    if (newDetail && newProducts) {
      const category = newDetail.category;
      relatedProducts.value = newProducts.filter(product => 
        product.category === category && product.id !== newDetail.id
      );
      console.log("Related Products:", relatedProducts.value);
    }
  });

  const addToCart = (product) => {
    store.commit('cart/addToCart', product);
    alert("produk berhasil ditambahkan")
  };

  const formattedDate = computed(() => {
    const createdAt = PopularproductDetail.value?.createdAt;
    if (!createdAt) return null;
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  });
</script>
