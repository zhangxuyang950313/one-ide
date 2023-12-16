<script lang="tsx">
import { defineComponent, toRefs, type PropType } from "vue";
// import { IconCode, IconMindMapping } from "@arco-design/web-vue/es/icon";
import { useToggle } from "@vueuse/core";
import { Resource } from "@/schema/schema.ts";
import XmlUI from "./XmlUI.vue";
import MonacoEditor from "../Monaco/Index.vue";

export default defineComponent({
  props: {
    resource: {
      type: Object as PropType<Resource>,
      required: true,
    },
  },
  emits: {
    "update:modelValue": (_v: string) => true,
  },
  setup(props) {
    const { origin } = toRefs(props.resource);
    const [useEditor] = useToggle(true);
    return () => (
      <div class="c-xml-handler">
        {/* <div class="title-bar">
          <span class="title">{name.value}</span>
          {useEditor.value ? (
            <IconMindMapping class="icon" onClick={() => toggle(false)} />
          ) : (
            <IconCode class="icon" onClick={() => toggle(true)} />
          )}
        </div> */}
        {useEditor.value ? (
          <MonacoEditor
            value={origin.value}
            options={{ language: "xml", theme: "vs-dark" }}
          />
        ) : (
          <XmlUI xml={origin.value} />
        )}
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.c-xml-handler {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-1);
    margin-bottom: 20px;
    .title {
      font-size: 20px;
    }
    .icon {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
