<template>
  <!-- {{ isLoadingUpdate && "Loading ..." }} -->

  <li class="list-group-item">
    <form @submit.prevent="addNewProduct">

      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <div class="mb-3">
            <base-input
              type="file"
              identity="productImage"
              label="Photo Product"
              @input="checkImage"
            ></base-input>
            <div>
              <img
                :src="productData.imageLink"
                :alt="productData.title"
                class="image"
              />
            </div>
          </div>
          <div class="mb-3">
            <base-input
              type="text"
              identity="productTitle"
              placeholder="Give your product a title"
              label="Product Title"
              v-model="productData.title"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-text-area
              identity="productDescription"
              label="Description"
              placeholder="Share story behind product and what make it spesial"
              v-model="productData.description"
            ></base-text-area>
          </div>
          <div class="mb-3">
            <base-text-area
              identity="productBrand"
              label="Brand"
              placeholder="what brand"
              v-model="productData.brand"
            ></base-text-area>
          </div>
          <div class="mb-3">
            <base-text-area
              identity="productColor"
              label="Color"
              placeholder="what color"
              v-model="productData.color"
            ></base-text-area>
          </div>
          <div class="mb-3">
            <base-text-area
              identity="productSizes"
              label="Sizes"
              placeholder="e.g S/M/L"
              v-model="productData.bm"
            ></base-text-area>
          </div>
          <div class="mb-3">
            <base-text-area
              identity="productPembagiam"
              label="Pembagian"
              placeholder="e.g full set / Pen only"
              v-model="productData.pembagian"
            ></base-text-area>
          </div>
          <div class="mb-3 mt-3">
            <base-select
              class="mt-3"
              :data="['Pens', 'Notebooks', 'Set Station', 'Accessories', 'Pencils', 'Electronics']"
              v-model="productData.category"
            ></base-select>
          </div>
          <div class="mb-3 mt-3">
            <base-select
              class="mt-3"
              :data="['Brand New', 'Lighly Used', 'Vintage']"
              v-model="productData.condition"
            ></base-select>
          </div>
        </div>
      </div>

          <div class="mb-3">
            <base-input
              type="number"
              identity="amount"
              placeholder="0"
              label="Amount"
              v-model="productData.amount"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-input
              type="number"
              identity="price"
              placeholder="0"
              label="Price"
              v-model="productData.price"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-input
              type="number"
              identity="shipping"
              placeholder="0"
              label="Shipping"
              v-model="productData.shipping"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-input
              type="number"
              identity="likes"
              placeholder="0"
              label="Likes"
              v-model="productData.likes"
              readonly="1"
            ></base-input>
          </div>


   
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <base-button class="cancel-btn px-3 py-2 ms-1">
          Cancel<!-- 12 -->
        </base-button>

        <base-button class="submit-product-btn px-3 py-2 ms-1">
          {{ isEdit ? "Update Data" : "Tambah Data" }}
        </base-button>
      </div>

    </form>
  </li>
</template>

<script setup>
const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseTextArea from "../ui/BaseTextArea.vue";
import { onMounted, reactive, ref, watchEffect } from "vue";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const productData = reactive({
  title: "",
  category: "",
  amount: 0,
  bm: "",
  brand: "",
  category: "Pens",
  color: "",
  condition: "Brand New",
  description: "",
  imageLink: "",
  likes: 0,
  pembagian: "",
  price: 0,
  shipping: 0,
});

watchEffect(() => {
  if (props.isEdit) {
    // true jika di halaman edit
    const valueEditProduct = store.state.popularproduct.popularproductsDetail; // null

    // Periksa apakah valueEditProfile sudah ada dan bukan null atau undefined
    if (valueEditProduct) {
      productData.imageLink = valueEditProduct.imageLink || "";
      productData.title = valueEditProduct.title || "";
      productData.description = valueEditProduct.description || "";
      productData.category = valueEditProduct.category || "";
      productData.amount = valueEditProduct.amount || 0;
      productData.likes = valueEditProduct.likes || 0;
      productData.price = valueEditProduct.price || 0;
      productData.shipping = valueEditProduct.shipping || 0;
      productData.brand = valueEditProduct.brand || "";
      productData.color = valueEditProduct.color || "";
      productData.condition = valueEditProduct.condition || "";
      productData.pembagian = valueEditProduct.pembagian || "";
      productData.bm = valueEditProduct.bm || "";
    }
  }
});

console.log({ productData });

// const totalTime = () => {
//   productData.price =
//     parseInt(productData.prepTime) + parseInt(productData.cookTime);
// };

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    productData.imageLink = reader.result;
  });
};

console.log({ isProps: props.isEdit });

const addNewProduct = async () => {
  try {
    // isLoadingUpdate.value = true;
    if (props.isEdit) {
      // Panggil action updateProfile jika isEdit bernilai true
      console.log("HELO");
      await store.dispatch("popularproduct/updateProduct", {
        id: route.params.id,
        newProduct: productData,
      });

      // isLoadingUpdate.value = false;

      alert("Data Berhasil diupdate");
      router.push("/user/user-product");

      return;
      // console.log({ productData })
    }

    // Panggil action addNewProduct jika isEdit bernilai false
    await store.dispatch("popularproduct/addNewProduct", {
      ...productData,
    });

    // isLoadingUpdate.value;

    alert("Data Berhasil di TAMBAH");
    router.push("/user/user-product");
  } catch (error) {
    console.error({ error });
    // isLoadingUpdate.value = false;
  }
};
</script>
