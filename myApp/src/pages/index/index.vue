<template>
  <view class="index">
    <text>{{ msg }}</text>
    <text>{{ test }}</text>
  </view>
</template>

<script>
import { ref } from "vue";
import "./index.scss";

export default {
  setup() {
    const msg = ref("Hello world");
    const test = ref("test");
    return {
      msg,
      test,
    };
  },
};
</script>
