<template>
  <div
    class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none"
    style="text-align: right"
  >
    <i style="color: #4c4ddc"></i>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
          <img 
              :src="profileImage" 
              alt="Profile" 
              style="width: 50px; height: 50px; border-radius: 50%;">
        </a>
        <a href=""></a>
        <ul class="dropdown-menu">
          <router-link to="/user/personal-info" class="dropdown-item">My Profile</router-link>
          <router-link to="/user/user-product" class="dropdown-item">Order</router-link>
          <li class="dropdown-item" @click="logout" style="color: red; cursor: pointer;">Logout</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  const store = useStore()
  const router = useRouter()

  const logout = () => {
    store.commit("auth/setUserLogout")
    router.push("/")
  };

  import { computed, reactive } from 'vue';

  const profileImage = computed(() => {
    return store.state.auth.userLogin?.imageLink || 'https://via.placeholder.com/150';
  });
</script>