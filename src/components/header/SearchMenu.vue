<template>
  <input
    class="form-control me-2"
    type="text"
    placeholder="Search for items"
   
   
    v-model="searchQuery"
    @input="handleCari"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const handleCari = () => {
    if (searchQuery.value.trim()) {
      router.push({ name: 'allItem', query: { search: searchQuery.value } });
    } else {
      router.push({ name: 'allItem', query: { search: '' } });
    }
  };
</script>