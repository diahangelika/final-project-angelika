<template>
  <div class="checkout-container container">
    <div class="row">
      <div class="col-md-8">
        <div class="card section mb-4">
          <h5 class="section-title">Order</h5>
          <div v-for="item in cartItems" :key="item.id" class="order-item d-flex align-items-center mb-3">
            <img :src="item.imageLink" alt="Product Image" class="product-image me-3" />
            <div>
              <h6 class="product-name">{{ item.title }}</h6>
              <p class="text-muted">{{ item.bm }}</p>
              <p>{{ formatRupiah(item.price) }}</p>
              <span>x{{ item.qty }}</span>
            </div>
          </div>
        </div>

        <div class="card section mb-4">
          <h5 class="section-title">Address</h5>
          <p class="text-muted">Butterfly Community</p>
          <p>Butterfly Community Address</p>
        </div>

        <div class="card section mb-4">
          <h5 class="section-title">Delivery Details</h5>
          <p class="text-muted">Fedex Express Shipping</p>
          <p>{{ findCurrentShipping?.shipping || "-" }}</p>
          <p>Home delivery in 1-3 working days</p>
        </div>

        <div class="card section">
          <h5 class="section-title">Payment Method</h5>
          <div class="d-flex align-items-center">
            <!-- <i class="fa fa-cc-visa" style="font-size: 24px; color: #333;"></i> -->
            <div>
              <p class="mb-1">+62 0987654345</p>
              <p class="text-muted mb-0">Yamakawa-san</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card order-summary">
          <div class="card-body">
            <h5 class="section-title">Order Summary</h5>
            <p>Order: {{ formatRupiah(cartTotal) }}</p>
            <p>Protection Fee: 0</p>
            <p>Shipping: {{ findCurrentShipping?.shipping || "-" }}</p>
            <hr>
            <h6>Total to Pay: {{ formatRupiah(checkoutTotal) }}</h6>
            <router-link to="/transaction-history">
              <button class="buttonPink p-2 w-100 mt-3" @click="checkout">Order Now</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const cartItems = computed(() => store.getters['cart/cartItems']);
const cartTotal = computed(() => store.getters['cart/cartTotal']);
const checkoutTotal = computed(() => store.getters['cart/checkoutTotal']);
const totalShippingCost = computed(() => store.state.cart.cartItems.reduce((total, item) => total + item.shipping, 0));

const cartItemsFromLS = localStorage.getItem('cartItems')
const parsedCartItems = cartItemsFromLS ? JSON.parse(cartItemsFromLS) : [] 
////////////// NOTE ///////////////////////////////
// JSON.parse untuk ngubah dari string (pas awal diambil datanya 
// kan dia jadi string tuh (cek console.log({ findCurrentShipping, cartItems, cartItemsFromLS }))) ke bentuk aslinya, klo kebalikannya jadi pakai stringify

const findCurrentShipping = parsedCartItems[0]

console.log({ findCurrentShipping, cartItems, cartItemsFromLS })

function formatRupiah(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

const checkout = () => {
  const transaction = {
    id: Date.now(),
    date: new Date().toLocaleDateString('id-ID'),
    status: 'Done',
    orderNumber: `ORD-${Date.now()}`,
    items: cartItems.value,
    totalPrice: checkoutTotal.value,
  };

  console.log({ transaction })
  store.dispatch('transaction/checkout', transaction);
  router.push('/user/transaction-history');
};
</script>

<style scoped>
.checkout-container {
  max-width: 1000px;
  margin: 0 auto;
}

.section {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.order-item {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.order-summary {
  padding: 20px;
}

.buttonPink {
  background-color: palevioletred;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
