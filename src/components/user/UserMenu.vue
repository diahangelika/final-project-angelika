<template>
  <div class="col-lg-3 mb-4">
    <ul class="list-group">
      <li class="list-group-item">
        <div class="d-flex align-items-center">
          <img
            :src="userData?.imageLink"
            src=""
            alt="Profile"
            width="36"
            height="36"
            class="rounded-circle"
            style="object-fit: cover"
          />
          <div class="ps-3">
            <p class="my-0 fs-5 fw-semibold">
              {{ userData?.fullname }}
            </p>
            <p class="my-0 fs-6 text-secondary">{{ userData?.email }}</p>
          </div>
        </div>
      </li>
      <li
        class="list-group-item user-menu"
        @click="menuClicked('personal-info')"
      >
        <i class="fa-solid fa-user pe-2"></i>Personal Info
      </li>
      <li
        class="list-group-item user-menu"
        @click="menuClicked('change-password')"
      >
        <i class="fas fa-heart pe-2"></i>Change Password
      </li>
      <li class="list-group-item user-menu" @click="menuClicked('transaction-history')">
        <i class="fa-solid fa-burger pe-2"></i>Transaction History
      </li>
      <li class="list-group-item user-menu" @click="menuClicked('user-product')">
        <i class="fa-solid fa-bag-shopping pe-2"></i>My Product
      </li>
    </ul>
  </div>
</template>

<script setup>
const emit = defineEmits(["changeComponent"]);

const menuClicked = (option) => {
  emit("changeComponent", option);
};

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const userData = computed(() => {
  return store.state.auth.userLogin;
});

console.log({ userData: userData.value });
</script>

<style scoped>
.user-menu:hover {
  cursor: pointer;
}

.active-color {
  color: #4c4ddc;
}

.inactive-color {
  color: #404040;
}
</style>
