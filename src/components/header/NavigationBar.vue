<template>
<div>
    <LoginMenu v-if="!isLoggedIn" />
    <SignupMenu v-if="!isLoggedIn" />

    <div style="display: flex; align-items: center;">
      <router-link to="/cart" style="display: flex; align-items: center; margin-right: 20px;">
        <span class="fa fa-shopping-cart" style="font-size: 20px; color: #333; position: relative;">
          <span v-if="cartItemCount > 0" class="badge">{{ cartItemCount }}</span>
        </span>
      </router-link>

      <router-link to="#" style="display: flex; align-items: center; margin-right: 20px;">
        <span class="far fa-heart" style="font-size: 20px; color: #333; position: relative;">
          <span v-if="likeItemCount > 0" class="badge">{{ likeItemCount }}</span>
        </span>
      </router-link>
      <ProfileMenu v-if="isLoggedIn" />
      <SelectLan />
    </div>
  </div>
</template>

<script setup>
  import SearchMenu from './SearchMenu.vue';
  import SignupMenu from './SignupMenu.vue';
  import LoginMenu from './LoginMenu.vue';
  import SelectLan from './SelectLan.vue';
  import ProfileMenu from './ProfileMenu.vue';
  import CartPage from '../pages/CartPage.vue';
  import { onMounted, computed, watch } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const isLoggedIn = computed(() => !!store.state.auth.token);
  const cartItemCount = computed(() => {
    return store.state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  });
  // const cartItemCount = computed(async () => {
  // const count = await store.dispatch('cart/calculateCartItemCount');
  //   return count;
  // });

  onMounted(() => {
    cartItemCount.value;
  });

  watch(isLoggedIn, (newValue) => {
    console.log(`User is ${newValue ? 'logged in' : 'logged out'}`);
  });
</script>
