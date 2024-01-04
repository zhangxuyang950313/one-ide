<script lang="tsx" setup>
import { computed, ref, defineComponent } from "vue";
import { useFetcher } from "alova";
import {
  IconFolder,
  IconFullscreen,
  IconInfoCircle,
  IconSync,
} from "@arco-design/web-vue/es/icon";
import { Image, ImagePreview, Spin } from "@arco-design/web-vue";
import { useStorageData } from "@/use/useStorageData";
import { Resource } from "@/schema/schema";
import { serviceCopyFile } from "@/service/file";
import TextOverflow from "@/components/common/TextOverflow.vue";

const props = defineProps<{
  resource: Resource;
}>();

const { editor } = useStorageData();

const time = ref(Date.now());

const previewVisible = ref(false);

const resInfo = computed(() => {
  const resource = props.resource;
  return [
    { label: "资源描述", value: resource.name },
    {
      label: "资源路径",
      valueComp: defineComponent({
        setup() {
          return () => (
            <span class="inline-flex items-center w-full">
              {resource.release.length > 1 && (
                <span class="border-[--color-primary] text-yellow-400 mr-1 w-[14px] h-[14px] border rounded-full flex-shrink-0 flex items-center justify-center text-xs">
                  {resource.release.length}
                </span>
              )}
              <span class="text-ellipsis w-full overflow-hidden">
                {resource.release.join("、")}
              </span>
            </span>
          );
        },
      }),
      content: resource.release.join("\n"),
    },
    { label: "原始尺寸", value: "100x100" },
    { label: "替换尺寸", value: "90x90" },
  ];
});

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

async function handleUseOrigin() {
  //
}

function handleOpenFolder() {
  window.electron.shell.showItemInFolder(releasePath.value);
}
</script>

<template>
  <div class="flex w-[50%] overflow-hidden p-[10px]">
    <div class="image-handler flex flex-col relative">
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
        class="cursor-pointer transition-all absolute top-[-10px] right-[-10px] w-[40px] h-[40px] border rounded-lg bg-[--color-border-3]"
        @click="handleUseOrigin"
      >
        <img class="object-contain w-full h-full" :src="resource.origin" />
      </div>
      <div
        class="tools my-[4px] mt-[-30px] flex justify-center gap-[2px] bg-[--color-mask-bg] transition-all"
      >
        <IconFolder class="icon-primary" @click="handleOpenFolder" />
        <IconFullscreen class="icon-primary" @click="previewVisible = true" />
        <IconInfoCircle class="icon-primary" @click="handleOpenFolder" />
        <ImagePreview v-model:visible="previewVisible" :src="imgUrl" />
        <IconSync
          v-show="!fetching"
          class="icon-primary"
          @click="handleImport"
        />
        <IconLoading v-show="fetching" class="icon-primary" />
      </div>
    </div>
    <div
      class="flex-grow ml-[20px] flex flex-col justify-evenly overflow-hidden"
    >
      <div class="flex items-center" v-for="(item, key) in resInfo" :key="key">
        <div class="flex-shrink-0 text-[--color-border-4] mr-1 text-xs">
          {{ item.label }}
        </div>
        <TextOverflow>
          <span class="leading-none text-base ml-1">
            <component v-if="item.valueComp" :is="item.valueComp" />
            <template v-if="item.value">{{ item.value }}</template>
          </span>
          <template #content>
            <p class="select-text">
              {{ item.content ? item.content : item.value }}
            </p>
          </template>
        </TextOverflow>
      </div>
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
