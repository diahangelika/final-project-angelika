<template>
  <ul class="list-group">
    <li class="list-group-item">
      <p class="my-0 fs-4 fw-semibold">Personal Info</p>
      <p>
        These details will be used for all the Meredith profiles associated with
        your email address. By filling out this information, you will receive a
        more personalized experience across all Meredith websites
      </p>
    </li>
    <li class="list-group-item">
        <profile-form
        :detailData="detailData"
        v-if="detailData && !isLoading"
        :isEdit="true"
      >
      </profile-form>
    </li>
  </ul>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ProfileForm from "../profileForm/ProfileForm.vue";

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
    console.error("Failed to load popularproducts details:", error);
  }
});

</script>
