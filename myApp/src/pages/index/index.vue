<template>
  <view class="container">
    <view class="header"
      ><vant-cell title="路由跳转" is-link @click="jump" />
    </view>

    <view class="content">
      <view class="img-item"
        ><vant-image
          width="50%"
          height="200px"
          fit="cover"
          :src="loading ? loadingGif : imgUrl1"
          show-loading="true"
          @load="onImageLoad"
        >
          <template v-slot:error>加载失败</template>
          <!-- <template v-slot:loading>
            <vant-loading type="spinner" size="50" />
          </template> -->
        </vant-image>

        <vant-cell title="cat" value="内容" label="这是xx"> </vant-cell>
        <vant-button plain="plain" type="info" @click="requestUrl">
          获取图片url
        </vant-button>
      </view>
      <view class="img-item">
        <vant-image
          width="50%"
          height="200px"
          fit="cover "
          :src="imgUrl"
          show-loading="true"
          ><template v-slot:error>加载失败</template></vant-image
        >
        <vant-button plain="plain" type="info" @click="chooseImage">
          上传图片
        </vant-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";

import "./index.scss";
import Taro from "@tarojs/taro";
import getImgUrl from "@/services/geturl.ts";
const imgUrl = ref("");
const imgUrl1 = ref("");
const loading = ref(true);
const loadingGif = ref("");

/**简单的跳转路由 */
const jump = () => {
  Taro.navigateTo({
    url: "/pages/product/product",
  });
};

// 还是封装在函数里好，不然会直接执行跳过点击
function chooseImage() {
  Taro.chooseImage({
    count: 1,
    sizeType: ["original", "compressed"],
    sourceType: ["album", "camera"],
    success: function (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths;
      console.log(tempFilePaths);
      imgUrl.value = tempFilePaths;
    },
  });
}
const requestUrl = () => {
  setTimeout(() => {
    loading.value = true;
    loadingGif.value =
      "https://img.zcool.cn/community/01114d59941891000000212989593d.gif";
  }, 300);

  getImgUrl().subscribe((res) => {
    console.log(res);
    imgUrl1.value = res;
  });
};

const onImageLoad = () => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};
</script>
