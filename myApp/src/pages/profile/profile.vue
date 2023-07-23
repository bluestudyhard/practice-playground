<template>
  <view>{{ msg }}</view>
  <van-button plain="plain" type="info">朴素按钮</van-button>
</template>
<script setup>
import { ref } from "vue";

const msg = ref("this is personal center!");
</script>
