<!-- <rectangle
    :x="20"
    :y="20"
    :width="100"
    :height="50"
    fill="green"
    stroke="black"
    :strokeWidth="4"
  />
  <group :x="200 + x">
    <circle
      v-for="(_, k) in ['red', 'green', 'orange', 'pink']"
      :key="k"
      :x="k * 42"
      :y="100"
      :width="20"
      :height="20"
      :radius="10 + k * 2"
      :fill="_"
      stroke="black"
      :strokeWidth="1"
    ></circle>
    啊啊
  </group>
  <group :x="300">大佬1</group>
  <text text="测试文字211" /> -->

<template>
  <circle
    v-for="(_, k) in ['red']"
    :key="k"
    :x="k * 42 + x"
    :y="100"
    :width="20"
    :height="20"
    :radius="10 + k * 2"
    :fill="_"
    stroke="black"
    :strokeWidth="1"
  ></circle>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// const show = ref(true);

const count = ref(1);
const x = computed(() => count.value * 10);
const y = computed(() => Math.sin(count.value) * 100 + window.innerHeight / 2);

function ani() {
  count.value = (count.value + 0.1) % 42;
  requestAnimationFrame(ani);
}
requestAnimationFrame(ani);
console.log({ x: x.value, a: 2 });

// window.addEventListener("click", () => {
//   // show.value = !show.value;
// });
</script>
