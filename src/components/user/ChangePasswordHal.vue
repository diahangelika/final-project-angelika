<template>
  <ul class="list-group">
    <li class="list-group-item">
      <p class="my-0 fs-4 fw-semibold">Change Password</p>
      <p>
        Reset Password here
      </p>
    </li>
    <li class="list-group-item">
        <change-password
        :detailData="detailData"
        v-if="detailData && !isLoading"
        :isEdit="true"
      >
      </change-password>
    </li>
  </ul>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ChangePassword from "../password/ChangePassword.vue";

const store = useStore();
const route = useRoute();
const detailData = ref({});
let isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading = true;
    const userId = route.params.id;
    const response = await store.dispatch("auth/getUser", userId);

    detailData.value = response;
    isLoading = false;
  } catch (error) {
    console.error("Failed", error);
  }
});
</script>