<script setup>
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from 'vue';
import { getApi } from '../api';
import ListItem from './ListItem.vue';
import { throttle } from '../utils';

// list data -- all
const listData = ref([]);

const data = reactive({
  itemSize: 0,
  screenHeight: 0,
  currentOffset: 0,
  start: 0,
  end: 0,
});

onMounted(async () => {
  listData.value = await getApi();
  nextTick(() => {
    data.screenHeight = document.querySelector('.container').clientHeight;
    //data.itemSize = document.querySelector('.content').children[0].clientHeight;
    data.itemSize = 100;
    data.start = 0;
    data.end = data.start + visibleCount.value;
  });
});

const listHeight = computed(() => {
  return listData.value.length * data.itemSize;
});

// 渲染区域元素数量
const visibleCount = computed(() => {
  return Math.ceil(data.screenHeight / data.itemSize);
});

const visibleData = computed(() => {
  return listData.value.slice(data.start, data.end);
});

// scroll event
const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  console.log(scrollTop);
  data.start = Math.floor(scrollTop / data.itemSize);
  data.end = data.start + visibleCount.value;
  data.currentOffset = scrollTop - (scrollTop % data.itemSize);
};

// throttled scroll function
const throttledHandleScroll = throttle(handleScroll, 200);


</script>

<template>
  <div class="container" @scroll.passive="throttledHandleScroll">
    <!-- 占位元素 -->
    <div class="phantom" :style="{ height: listHeight + 'px' }"></div>
    <!-- 渲染区域 -->
    <div
      class="content"
      :style="{ transform: `translate3d(0, ${data.currentOffset}px, 0)` }"
    >
      <ListItem 
        v-for="(item, index) in visibleData"
        :post="item"
        :key="index" 
        :style="{ height: data.itemSize + 'px' }"
      />
    </div>
  </div>
</template>

<style scoped>

.container {
  position: relative;
  height: 90vh;
  overflow: auto;
}

.phantom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.content {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
}
</style>