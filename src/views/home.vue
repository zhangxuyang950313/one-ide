<script setup lang="ts">
import ModuleSelector from "../components/ModuleSelector.vue";


</script>

<template>
  <main class="main">
    <section>
      <ModuleSelector :modules="[]"/>
    </section>
  </main>
</template>

<style lang="less" scoped>
.main {
  background-color: var(--color-bg-1);
}
</style>