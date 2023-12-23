<template>
  <main class="w-full h-full flex flex-col overflow-hidden">
    <Form :model="formModel" layout="vertical" class="flex-grow">
      <Form.Item label="名称">
        <Input v-model="formModel.name" placeholder="输入名称" />
      </Form.Item>
      <Form.Item label="路径">
        <Input
          v-model="formModel.path"
          placeholder="输入或选择本地目录"
          class="path-input"
        >
          <template #append>
            <Button @click="handleOpenFolder" type="text">
              <IconFolder />
            </Button>
          </template>
        </Input>
      </Form.Item>
    </Form>
  </main>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { Form, Input, Button } from "@arco-design/web-vue";
import { IconFolder } from "@arco-design/web-vue/es/icon";
import { defineEmit } from "@/utils";

const props = defineProps<{ modelValue: { name: string; path: string } }>();
const emits = defineEmits({
  "update:modelValue": defineEmit<typeof formModel>(),
});

const formModel = reactive({
  name: props.modelValue.name,
  path: props.modelValue.path,
});

async function handleOpenFolder() {
  // https://electronjs.org/zh/docs/latest/api/dialog
  const files = await window.electron.dialog.showOpenDialog({
    message: "选择创作目录",
    properties: ["openDirectory", "createDirectory", "promptToCreate"],
  });
  if (files.canceled || !(files.filePaths?.length > 0)) return;
  formModel.path = files.filePaths[0];
}

watchEffect(() => {
  emits("update:modelValue", formModel);
});
</script>

<style lang="less" scoped>
.path-input {
  :deep(.arco-input-append) {
    padding: 0;
  }
}
</style>
