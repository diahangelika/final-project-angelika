<template>
  <div class="container">
    <h3 class="mb-4">My Order</h3>
    <div class="card order-card">
      <div class="card-body" v-for="item in historyItems2" :key="item.id">
        <div class="order-header">
          <div class="order-icon">
            <i class="fa fa-shopping-bag"></i> Shopping
          </div>
          <span class="order-date">{{ moment(item.date).format("YYYY-MM-DD") }}</span>
          <span class="order-status">{{item.status}}</span>
          <span class="order-number">{{ item.orderNumber }}</span>
        </div>
        <div class="order-content" v-for="product in item.items" :key="product.id">
          <img :src="product.imageLink" alt="Product Image" class="order-item-image" />
          <div class="product-info">
            <h6 class="product-name">{{ product.title }}</h6>
            <p class="text-muted mb-1">{{ product.quantity }} product x {{ formatRupiah(product.price) }}</p>
            <p class="text-muted">Size: {{ product.bm }}</p>
            <p v-if="product.length > 1" class="text-muted">+ {{ product.length - 1 }} more products</p>
          </div>

        </div>
        <div class="order-total">
            <p>Total price</p>
            <h6>{{ formatRupiah(item.totalPrice) }}</h6>
          </div>
        <button class="buy-again-btn" @click="buyAgain">Buy Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import moment from 'moment';

const store = useStore();
const router = useRouter();

const historyItems2 = computed(() => store.getters['transaction/getTransaction']);

function formatRupiah(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

// function buyAgain() {
//   store.dispatch('cart/addToCart', historyItems2.items.id);
//   router.push('/cart');
// }
function buyAgain(transaction) {
  transaction.items.forEach(product => {
    store.dispatch('cart/addToCart', product);
  });
  router.push('/cart');
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
}

.order-icon {
  color: palevioletred;
  font-size: 18px;
  margin-right: 8px;
}

.order-date, .order-status, .order-number {
  margin-left: 8px;
}

.order-status {
  color: #28a745;
  font-weight: bold;
}

.order-content {
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
}

.order-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 16px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.order-total {
  text-align: right;
}

.order-total p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.order-total h6 {
  font-size: 18px;
  color: #000;
  font-weight: bold;
}

.buy-again-btn {
  width: 100%;
  background-color: palevioletred;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  margin-top: 16px;
  cursor: pointer;
}

.buy-again-btn:hover {
  background-color: pink;
}
</style>
