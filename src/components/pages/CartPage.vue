<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h3 class="mb-4">Cart</h3>
        <div v-if="cartItems.length !== 0">
          <div v-for="item in cartItems" :key="item.id" class="cart-item mb-4 pb-3 border-bottom me-3">
            <img :src="item.imageLink" alt="Product Image" class="cart-item-image" />
            <div class="d-flex align-items-center w-100">
              <div class="product-info flex-grow-1 ms-3">
                <h6 class="product-name">{{ item.title }}</h6>
                <p class="text-muted mb-1" style="font-size: 16px;">{{ item.bm }}</p>
                <p class="mb-1" style="font-size: 16px;">{{ formatRupiah(item.price) }}</p>
                <button class="buttonPink py-1 px-2" @click="removeFromCart(item.id)">Remove</button>
              </div>
              <div class="quantity-controls d-flex ms-auto align-items-center">
                <button class="buttonPink" @click="increaseQuantity(item.id)">+</button>
                <span class="quantity-display btn-softpink mx-2 px-3 py-1">{{ item.qty }}</span>
                <button class="buttonPink" @click="decreaseQuantity(item.id)" :disabled="item.qty <= 1">-</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="py-5 text-center empty-cart mb-5">
          <i class="fas fa-shopping-cart empty-cart-icon"></i>
          <div class="empty-cart-text">
            <h3>Your cart is still empty</h3>
          </div>
          <router-link to="/allitem" class="find-products-btn" style="text-decoration: none; color: #ff82cd;">Find Products</router-link>
        </div>
      </div>

      <div class="col-md-4 order-summary">
        <div class="card" style="width: 100%;">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 class="card-title">Order Summary</h5>
                <p class="text-muted" style="font-size: 14px;">{{ itemCount }} items</p>
              </div>
              <div>
                <h6 class="total-price fs-4 mb-0">{{ formatRupiah(cartTotal) }}</h6>
                <p class="text-muted">Not include shipping fee</p>
              </div>
            </div>
            <hr>
            <router-link to="/checkout">
              <button class="buttonPink p-2 w-100" @click="checkout">Checkout</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <h3>Other Products</h3>
    <popular-product-list :popularproducts="otherProducts"></popular-product-list>
  </div>


</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import PopularProductList from '../product/PopularProductList.vue';

const store = useStore();
const router = useRouter();

const popularProductList = ref([]);

onMounted(async () => {
  try {
    await store.dispatch("popularproduct/getPopularProductData");
    popularProductList.value = store.state.popularproduct.popularproducts;
  } catch (error) {
    console.log(error);
  }
});

const cartItems = computed(() => store.getters['cart/cartItems']);
const cartTotal = computed(() => store.getters['cart/cartTotal']);
const itemCount = computed(() => store.getters['cart/itemCount']);

const otherProducts = computed(() => {
  const cartItemIds = cartItems.value.map(item => item.id);
  return popularProductList.value.filter(product => !cartItemIds.includes(product.id));
});

function removeFromCart(productId) {
  store.dispatch('cart/removeFromCart', productId);
}

function increaseQuantity(productId) {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    store.dispatch('cart/addToCart', { ...item, qty: 1 });
  }
}

function decreaseQuantity(productId) {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    const newQty = item.qty - 1;
    store.dispatch('cart/updateQuantity', { productId, qty: newQty });
  }
}

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
    totalPrice: cartTotal.value,
  };
  store.dispatch('transaction/checkout', transaction);
  router.push('/user/transaction-history');
  
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
}
.cart-item-image {
  width: 100px;
  height: auto;
}
.product-info {
  margin-right: 10px;
}
.product-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.quantity-controls button {
  padding: 5px 10px;
}
.empty-cart {
  text-align: center;
}
.empty-cart-icon {
  font-size: 100px;
  color: palevioletred;
  margin-bottom: 10px;
}
.order-summary .checkout-btn {
  background-color: palevioletred;
  color: white;
  border-radius: 5px;
}
.buttonPink {
  border: none;
  background-color: palevioletred;
  color: antiquewhite;
  border-radius: 5px;
}
</style>
