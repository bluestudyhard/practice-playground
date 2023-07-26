<template>
  <view>{{ msg }}</view>
  <vant-button plain="plain" type="info">朴素按钮</vant-button>
  <vant-button type="primary">主要按钮</vant-button>
</template>
<script setup>
import { ref } from "vue";

const msg = ref("this is personal center!");
</script>
