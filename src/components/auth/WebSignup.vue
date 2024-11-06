<template>
  <form @submit.prevent="register" style="width: 500px; display: flex; flex-direction: column; justify-content: center; margin-left: 30%; margin-top: 50px; margin-bottom: 50px;">
    <!-- Form Header -->
    <div style="display: flex; flex-direction: row; justify-content: space-between; margin-bottom: 5px; align-items: center;">
      <h3>Signup</h3>
      <router-link to="/" style="color: black; text-decoration: none; font-size: 15px;">X</router-link>
    </div>

    <div id="emailHelp" class="form-text" style="margin-top: 0; padding-top: 0; margin-bottom: 5px;">Enter your details below</div>

    <!-- Full Name -->
    <div class="mb-3">
      <base-input 
          type="text" 
          identity="fullname"
          placeholder="Enter your Full Name"
          label="Full Name"
          v-model="signupData.fullname">
      </base-input>
    </div>

    <!-- Username -->
    <div class="mb-3">
      <base-input 
          type="text" 
          identity="username"
          placeholder="Enter your Username"
          label="Username"
          v-model="signupData.username">
      </base-input>
    </div>

    <!-- Email -->
    <div class="mb-3">
      <base-input  
          type="email" 
          identity="email"
          placeholder="Enter your email"
          label="Email"
          v-model="signupData.email">
      </base-input>
    </div>

    <!-- Password -->
    <div class="mb-3">
      <base-input 
          type="password" 
          identity="password"
          placeholder="Enter your Password"
          label="Password"
          v-model="signupData.password"
          @input="passwordCheck">
      </base-input>
      <p
        class="text-danger mt-1 fw-medium"
        style="font-size: 11px"
        :style="{ display: passwordStatusDisplay }"
      >
        The password field must be at least 8 characters
      </p>
    </div>

    <!-- Confirm Password -->
    <div class="mb-3">
      <base-input 
        type="password" 
        identity="confirmedPassword"
        placeholder="Enter your Confirmation Password"
        label="Confirmation Password"
        v-model="signupData.confirmationPassword"
        @input="confirmationPasswordCheck">
      </base-input>
      <p
        class="text-danger mt-1 fw-medium"
        style="font-size: 11px"
        :style="{ display: confirmationPasswordDoesNotMatch }"
      >
        The password confirmation does not match
      </p>
    </div>

    <!-- Profile Photo -->
    <div class="mb-3">
      <base-input
        type="file"
        identity="profileImage"
        label="Profile Photo"
        isImage="true"
        @input="checkImage"
      >
        <div>
          <div class="border p-1 mt-2 rounded-circle">
            <img
              :src="signupData.imageLink"
              class="rounded-circle"
              width="140"
              height="150"
              style="object-fit: cover"
            />
          </div>
          <div class="text-center" style="transform: translateY(-24px)">
            <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
          </div>
        </div>
      </base-input>
    </div>

    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">
        By clicking sign up. I Hereby agree and consent to 
        <span style="color: palevioletred;">Terms and Conditions</span>;
        I confirm that I have read <span style="color: palevioletred;">privacy policy.</span>
      </label>
    </div>

    <base-button type="button" class="btn btn-danger" style="width: 100%;" @clickButton="register">Sign Up</base-button>

    <div class="text-center mt-4">
      <p class="fw-semibold">
        Already have an account? <span style="color: #4c4ddc">
          <router-link to="/login" class="text-decoration-none">Login</router-link>
        </span>
      </p>
    </div>
  </form>
</template>

<script setup>
  import BaseButton from '../ui/BaseButton.vue';
  import BaseInput from '../ui/BaseInput.vue';
  import { reactive, ref } from 'vue';
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";

  const store = useStore();
  const router = useRouter();
  
  // Reactive Signup Data
  const signupData = reactive({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmationPassword: "",
    imageLink: "",
  });

  const passwordStatusDisplay = ref("none");
  const confirmationPasswordDoesNotMatch = ref("none");

  const passwordCheck = () => {
    passwordStatusDisplay.value = signupData.password.length < 8 ? "block" : "none";
  };

  const confirmationPasswordCheck = () => {
    confirmationPasswordDoesNotMatch.value = (signupData.password !== signupData.confirmationPassword) ? "block" : "none";
  };

  const checkImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => { signupData.imageLink = reader.result; };
    reader.readAsDataURL(file);
  };

  const register = async () => {
    passwordCheck();
    confirmationPasswordCheck();
    
    if (signupData.password.length >= 8 && signupData.password === signupData.confirmationPassword) {
      const response = await store.dispatch("auth/getRegisterData", signupData);
      if (!response) return alert("Oops, registration failed");
      
      alert("Registration successful!");
      router.push("/");
    } else {
      signupData.password = "";
      signupData.confirmationPassword = "";
    }
  };
</script>
