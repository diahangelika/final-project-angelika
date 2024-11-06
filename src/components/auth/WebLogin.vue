<template>
<form @submit.prevent="login" style="width: 500px; display: flex; flex-direction: column; justify-content: center; margin-left: 30%; margin-top: 50px; margin-bottom: 50px;">
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 5px; align-items: center;">
      <h3>Login</h3>
      <router-link to="/" style="color: black; text-decoration: none; font-size: 15px;">X</router-link>
    </div>
    <div id="emailHelp" class="form-text" style="margin-top: 0; padding-top: 0; margin-bottom: 5px;">Enter your details below</div>
    <div class="mb-3" id="exampleInputEmail1">
      <base-input 
          type="email" 
          identity="email"
          placeholder="Enter your Email"
          label="Email"
          v-model="loginData.email">
      </base-input>
    </div>
    <div class="mb-3" id="exampleInputEmail1">
      <base-input   
          type="password" 
          identity="password"
          placeholder="Enter your Password"
          label="Password"
          v-model="loginData.password">
      </base-input>
    </div>
      <base-button type="button" class="btn btn-danger" style="width: 100%;"  @clickButton="login">Log In</base-button>

    <div class="text-center mt-4">
          <p class="fw-semibold">
            Don’t have an account?<span style="color: #4c4ddc">
              <router-link to="/signup" class="text-decoration-none">
                Signup</router-link
              ></span>
          </p>
    </div>
  </form>

</template>

<script setup>
  import BaseInput from "../ui/BaseInput.vue";
  import BaseButton from "../ui/BaseButton.vue";

  import { reactive } from "vue";
  const loginData = reactive({
    email: "",
    password: "",
    isLogin: true,
  });

  import { useStore } from "vuex";
  import { useRouter } from "vue-router";

  const store = useStore();
  const router = useRouter();

  const login = async () => {
    const response = await store.dispatch("auth/getLoginData", loginData);

    if (response?.idToken) {
      alert("Berhasil Login");
      router.push("/");

      return;
    }

    alert("Gagal login");
  };
</script>
