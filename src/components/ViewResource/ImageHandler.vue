<script lang="ts" setup>
import { computed, ref } from "vue";
import { useFetcher } from "alova";
import {
  IconFullscreen,
  IconImport,
  IconLaunch,
  IconTool,
} from "@arco-design/web-vue/es/icon";
import { Image, ImagePreview, Spin } from "@arco-design/web-vue";
import { useStorageData } from "@/use/useStorageData";
import { Resource } from "@/schema/schema.ts";
import { serviceCopyFile } from "@/service/file";

const props = defineProps<{
  resource: Resource;
}>();

const { editor } = useStorageData();

const time = ref(Date.now());

const previewVisible = ref(false);

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
  <div class="image-handler flex flex-col">
    <div
      class="inline-flex items-center justify-center w-[126px] h-[126px] rounded-[6px] cursor-pointer gird-bg"
    >
      <Image
        class="flex items-center justify-center w-[80%] h-[80%]"
        style="display: flex !important"
        width="90%"
        height="90%"
        fit="contain"
        show-loader
        :preview="false"
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
    <div
      class="tools my-[4px] mt-[-30px] flex justify-center gap-[2px] bg-[--color-mask-bg] transition-all"
    >
      <IconImport
        v-show="!fetching"
        class="icon-primary"
        @click="handleImport"
      />
      <IconLoading v-show="fetching" class="icon-primary" />
      <IconFullscreen class="icon-primary" @click="previewVisible = true" />
      <ImagePreview v-model:visible="previewVisible" :src="imgUrl" />
      <IconTool class="icon-primary" @click="handleOpenFolder" />
      <IconLaunch class="icon-primary" @click="handleOpenFolder" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.image-handler {
  .tools {
    transform: scale(0);
    transform-origin: 50% 100%;
    opacity: 0;
  }
  &:hover {
    .tools {
      transform: scale(1);
      opacity: 1;
    }
  }
}
.icon-primary {
  width: 30px;
  height: 30px;
  padding: 5px;
  @apply text-base cursor-pointer;
  @apply transition-all;
  // background-color: var(--color-border-2);
  border-radius: 50%;
  overflow: hidden;
  &:hover {
    // background-color: var(--color-border-4);
    background-color: rgb(var(--primary-5));
    color: black;
    @apply transition-all;
  }
}

.gird-bg {
  background: url("../../assets/image-bg.svg") no-repeat center/100%;
}
</style>
