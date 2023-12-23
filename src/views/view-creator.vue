<template>
  <main class="w-full h-full p-[20px] flex flex-col overflow-hidden">
    <h1 class="m-0">创建</h1>
    <Form :model="formModel" layout="vertical" class="mt-[40px] flex-grow">
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
    <div class="flex">
      <Button class="w-[50%]" @click="handleCancel">取消</Button>
      <Button class="w-[50%]" type="primary" @click="handleNext">下一步</Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Form, Input, Button } from "@arco-design/web-vue";
import { IconFolder } from "@arco-design/web-vue/es/icon";
import { useJumper } from "@/use/useJumper";

const { openEditor } = useJumper();
const formModel = reactive({
  name: "",
  path: "",
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

function handleCancel() {
  window.close();
}

function handleNext() {
  openEditor(formModel.path);
  window.parent?.close();
  window.close();
}
</script>

<style lang="less" scoped>
.path-input {
  :deep(.arco-input-append) {
    padding: 0;
  }
}
</style>
