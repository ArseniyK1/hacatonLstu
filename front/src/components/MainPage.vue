<template>
  <!--  <div class="full-width full-height">asdasd</div>-->
  <q-page class="qpage">Главная страница</q-page>
</template>

<script setup>
import { ref } from "vue";

const userData = ref([]);
</script>
<style scoped>
.qpage {
  height: calc(100vh - 400px) !important;
}
</style>
