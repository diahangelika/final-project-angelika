<template>
  <!-- {{ isLoadingUpdate && "Loading ..." }} -->

  <li class="list-group-item">
    <form @submit.prevent="updateProfile">

      <div class="profile-picture-section mb-4">
        <label>Photo</label>
        <div class="d-flex align-items-center">
          <!-- Display Selected Image Preview -->
          <!-- <img :src="userData.imageLink" alt="Profile Picture" class="profile-preview me-3" /> -->
          <div>
            <img :src="userData.imageLink"
                  :alt="userData.title"
                  class="rounded-circle"
                  width="140"
                  height="150"
                  style="object-fit: cover">
          </div>
          <base-input
                type="file" 
                identity="Profileimage"
                label="Profile Pictures"
                @input="checkImage" >
          </base-input>
          <button @click="removeImage" type="button" class="btn btn-danger btn-sm ms-2">Remove</button>
        </div>
        <small class="text-muted">JPG, JPEG, or PNG, 1 MB max.</small>
      </div>
      <!-- General Information Start -->
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <div class="mb-3">
            <base-input 
                type="text" 
                identity="fullname"
                placeholder="Enter your Full Name"
                label="Full Name"
                v-model="userData.fullname">
            </base-input>
          </div>

          <!-- Username -->
          <div class="mb-3">
            <base-input 
                type="text" 
                identity="username"
                placeholder="Enter your Username"
                label="Username"
                v-model="userData.username">
            </base-input>
          </div>

          <!-- Email -->
          <div class="mb-3">
            <base-input  
                type="email" 
                identity="email"
                placeholder="Enter your email"
                label="Email"
                v-model="userData.email">
            </base-input>
          </div>
              <base-button class="submit-profile-btn px-3 py-2 ms-1">
                {{ isEdit ? "Update Data" : "Tambah Data" }}
              </base-button>
            </div>
        </div>
    </form>
  </li>
</template>

<script setup>
const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const userData = reactive({
  fullname: "",
  email: "",
  username: "",
  imageLink: "",
});



onMounted(() => {
  if (props.isEdit) {
    const valueEditProfile = store.state.auth.userLogin;
    if (valueEditProfile) {
      userData.username = valueEditProfile.username || "";
      userData.fullname = valueEditProfile.fullname || "";
      userData.email = valueEditProfile.email || "";
      userData.imageLink = valueEditProfile.imageLink || "";
    }
  }
});

console.log({ isProps: props.isEdit });

console.log("User ID:", route.params.id);

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    userData.imageLink = reader.result;
  });
};

const removeImage = () => {
  // previewImage.value = defaultImage;
  userData.imageLink = null;
};


const updateProfile = async () => {
  try {
    await store.dispatch('auth/updateUserEmail', userData)
    router.push('/user/personal-info')
  } catch (err) {
    console.log(err)
  }
}

// //////////////////////////////////////////////////////////////////
// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     previewImage.value = URL.createObjectURL(file);
//     userData.imageLink = file;
//   }
// };

// const removeImage = () => {
//   previewImage.value = defaultImage;
//   userData.imageLink = null;
// };

// const updateProfile = async () => {
//   try {
//     await store.dispatch('auth/updateUserEmail', userData)
//     router.push('/user/personal-info')
//   } catch (err) {
//     console.log(err)
//   }
// }
// ///////////////////////////////////////////////////////////////////////////



// const editProfile = async () => {
//   try {
//       console.log("HELO");

//       await store.dispatch("auth/updateProfile", {
//         id: route.params.id,
//         newProfile: userData,
//       });

//       alert("Data Berhasil diupdate");
//       router.push("/user/personal-info");

//       return;
//   } catch (error) {
//     console.error({ error });
//     isLoadingUpdate.value = false;
//   }
// };

</script>
