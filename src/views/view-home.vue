<template>
  <main class="w-full h-full flex">
    <section
      class="flex-col flex-shrink-0 w-[200px] h-full py-[20px] border-r border-r-[var(--color-border-2)]"
    >
      <img class="w-[100px] mx-[20px] py-[20px]" :src="Logo" />
      <Menu class="mt-[30px]" :default-selected-keys="['0']">
        <Menu.Item key="0">小米主题</Menu.Item>
        <Menu.Item key="1" disabled>小米小部件(规划中)</Menu.Item>
      </Menu>
    </section>
    <section class="flex-col flex-grow">
      <!-- 列表 -->
      <div
        v-show="!creatorVisible"
        class="flex flex-col overflow-hidden h-full"
      >
        <div class="flex justify-between items-center my-[40px] mx-[20px]">
          <h1 class="m-0 mr-4 leading-[1] flex-shrink-0">我的创作</h1>
          <Space>
            <Button @click="handleStart">新的创作</Button>
            <Button @click="handleImport">导 入</Button>
          </Space>
        </div>
        <section
          v-show="!creatorVisible"
          class="flex flex-col overflow-auto px-[20px]"
        >
          <div
            v-for="(project, k) in projects"
            :key="k"
            class="flex items-center w-full p-3 cursor-pointer hover:bg-[var(--color-border-2)] rounded-md"
            @click="handleOpenEditor(project.path)"
          >
            <div
              class="w-[30px] h-[30px] bg-gray-500 flex flex-shrink-0 items-center justify-center rounded"
            >
              {{ project.name[0] || "T" }}
            </div>
            <div class="flex-col items-center ml-[10px] flex-grow">
              <p>{{ project.name }}</p>
              <p class="text-[var(--color-border-4)]">{{ project.path }}</p>
            </div>
          </div>
        </section>
      </div>
      <!-- 创建 -->
      <div v-show="creatorVisible">
        <div
          class="flex justify-between items-end mb-[20px] my-[40px] mx-[20px]"
        >
          <h1 class="m-0 leading-[1]">新的创作</h1>
          <Space>
            <Button @click="handleCancel">创作列表</Button>
            <Button @click="handleOk">确 定</Button>
          </Space>
        </div>
        <Creator
          class="p-[20px]"
          v-show="creatorVisible"
          v-model="formModel"
          @close="creatorVisible = false"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Menu, Button, Space } from "@arco-design/web-vue";
import { useToggle } from "@vueuse/core";
import Logo from "@/assets/logo.png";
import { useJumper } from "@/use/useJumper";
import { useStorageData } from "@/use/useStorageData";
import Creator from "@/components/Creator.vue";

const { openEditor } = useJumper();
const { projects } = useStorageData();
const [creatorVisible, toggle] = useToggle();

// 新项目表单
const formModel = ref({
  name: "",
  path: "",
});

// 开始创作
async function handleStart() {
  toggle(true);
}

// 导入
async function handleImport() {
  const values = await window.electron.dialog.showOpenDialog({
    message: "打开项目",
    properties: ["openDirectory", "createDirectory", "promptToCreate"],
  });
  if (values.canceled || values.filePaths.length == 0) return;
  const path = values.filePaths[0];
  projects.value.unshift({
    name: `导入的项目${Date.now()}`,
    path,
  });
}

function handleCancel() {
  toggle(false);
}

// 确定创建
function handleOk() {
  projects.value.unshift({ ...formModel.value });
  formModel.value.name = "";
  formModel.value.path = "";
  toggle(false);
}

// 进入编辑器
function handleOpenEditor(p: string) {
  openEditor(p);
  // window.close();
}
</script>
