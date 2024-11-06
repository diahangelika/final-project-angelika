<template>
  <div class="change-password-container">
    <form @submit.prevent="submitChangePassword">
      <!-- Old Password -->
      <base-input
        v-model="form.oldPassword"
        type="password"
        label="Old Password"
        placeholder="Enter old password"
        :error="errors.oldPassword"
      />
      
      <!-- New Password -->
      <base-input
        v-model="form.newPassword"
        type="password"
        label="New Password"
        placeholder="Enter new password"
        :error="errors.newPassword"
      />
      
      <!-- Confirm New Password -->
      <base-input
        v-model="form.confirmPassword"
        type="password"
        label="Confirm New Password"
        placeholder="Confirm new password"
        :error="errors.confirmPassword"
      />
      
      <base-button type="submit" :loading="isLoading">Save Changes</base-button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";

const store = useStore();
const isLoading = ref(false);
const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const errors = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

function validateForm() {
  errors.oldPassword = form.oldPassword ? "" : "Old password is required.";
  errors.newPassword = form.newPassword ? "" : "New password is required.";
  errors.confirmPassword =
    form.confirmPassword === form.newPassword
      ? ""
      : "Passwords do not match.";
  return !errors.oldPassword && !errors.newPassword && !errors.confirmPassword;
}

async function submitChangePassword() {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await store.dispatch("auth/changePassword", {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    });
    alert("Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    alert("Failed to change password");
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.change-password-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
</style>
