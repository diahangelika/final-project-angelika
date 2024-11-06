<template>
  <div class="container-md my-5 py-5">
    <div class="row">
      <user-menu @changeComponent="$router.push($event)"></user-menu>
        <div class="col-lg-9">
          <component :is="component[getRoute]"></component>
        </div>
    </div>
  </div>
</template>

<script setup>
  import UserMenu from '../user/UserMenu.vue';
  import PersonalInfo from '../user/PersonalInfo.vue';
  import ChangePassword from '../password/ChangePasswordContent.vue';
  import ChangePasswordHal from '../user/ChangePasswordHal.vue';
  import UserProduct from '../user/UserProduct.vue';
  import TransactionHistoryPage from './TransactionHistoryPage.vue';

  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const component = {
    "user-menu": UserMenu,
    "personal-info": PersonalInfo,
    "change-password": ChangePasswordHal,
    "user-product": UserProduct,
    "transaction-history": TransactionHistoryPage
  }

  const getRoute = computed(() => {
    return route.params.component
  })

</script>