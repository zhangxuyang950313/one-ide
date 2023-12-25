<script lang="ts" setup>
import { computed, ref } from "vue";
import { IconImport } from "@arco-design/web-vue/es/icon";
import { useFetcher } from "alova";
import { Image, Spin } from "@arco-design/web-vue";
import { useStorageData } from "@/use/useStorageData";
import { Resource } from "@/schema/schema.ts";
import { serviceCopyFile } from "@/service/file";

const props = defineProps<{
  resource: Resource;
}>();

const { editor } = useStorageData();

const time = ref(Date.now());

const releasePath = computed(
  () => `${editor.value.current || ""}/${props.resource.release[0] || ""}`,
);

const imgUrl = computed(
  () => `one://file?p=${releasePath.value}&t=${time.value}`,
);

const { fetch, fetching, onSuccess } = useFetcher();

// 请求成功后刷新图片
onSuccess(() => {
  time.value = Date.now();
});

async function handleImport() {
  const res = await window.electron.dialog.showOpenDialog({
    properties: ["openFile"],
  });
  if (res.canceled && res.filePaths.length === 0) return;
  props.resource.release.forEach((rel) => {
    fetch(
      serviceCopyFile({
        from: res.filePaths[0],
        to: `${editor.value.current}/${rel}`,
      }),
    );
  });
}

function handleOpenFolder() {
  window.electron.shell.showItemInFolder(releasePath.value);
}
</script>

<template>
  <div class="flex">
    <div
      class="inline-flex items-center justify-center w-[100px] h-[100px] rounded-[6px] cursor-pointer gird-bg"
    >
      <Image
        class="flex items-center justify-center w-[80%] h-[80%]"
        style="display: flex !important"
        width="90%"
        height="90%"
        fit="contain"
        show-loader
        :src="imgUrl"
        @click="handleOpenFolder"
      >
        <template #loader>
          <div class="w-full h-full flex items-center justify-center">
            <Spin loading />
          </div>
        </template>
      </Image>
      <!-- <img
        class="w-[80%] h-[80%] object-contain"
        alt=""
        @click="handleOpenFolder"
        v-lazy="imgUrl"
      /> -->
    </div>
    <div class="mx-[10px]">
      <IconImport
        v-show="!fetching"
        class="icon-primary"
        @click="handleImport"
      />
      <IconLoading v-show="fetching" class="icon-primary" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.icon-primary {
  @apply text-lg cursor-pointer;
  @apply hover:opacity-50;
}

.gird-bg {
  background: url("../../assets/image-bg.svg") no-repeat center/100%;
}
</style>
