<template>
  <ul class="list-group">
    <profile-form-body :isEdit="isEdit" :detailData="detailData"></profile-form-body>
  </ul>
</template>

<script setup>
import ProfileFormBody from './ProfileFormBody.vue';

import { defineProps } from 'vue';

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});
</script>
