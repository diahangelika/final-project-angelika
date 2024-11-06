<template>
  <ul class="list-group">
    <change-password-content :isEdit="isEdit" :detailData="detailData"></change-password-content>
  </ul>
</template>

<script setup>
import ChangePasswordContent from './ChangePasswordContent.vue';

import { defineProps } from 'vue';

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});
</script>
