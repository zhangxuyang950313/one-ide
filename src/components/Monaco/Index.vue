<script lang="tsx">
import {
  defineComponent,
  ref,
  watchEffect,
  type VNodeRef,
  type PropType,
} from "vue";
import { editor } from "monaco-editor";

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Object as PropType<editor.IStandaloneEditorConstructionOptions>,
      default: () => {
        return {
          language: "json",
          // theme: "vs-light",
        } as editor.IStandaloneEditorConstructionOptions;
      },
    },
  },
  emits: {
    "update:value": (_v: string) => true,
  },
  setup(props) {
    let editorIns: editor.IStandaloneCodeEditor;
    const modelValue = ref(props.value);
    const onVNodeMounted: VNodeRef = (ref) => {
      if (!(ref instanceof HTMLDivElement)) return;
      editorIns = editor.create(ref, {
        ...props.options,
        value: props.value,
        automaticLayout: true,
      });
    };

    watchEffect(() => {
      editorIns?.setValue(modelValue.value);
    });

    return () => <div ref={onVNodeMounted} class="c-monaco-editor"></div>;
  },
});
</script>

<style lang="less" scoped>
.c-monaco-editor {
  width: 100%;
  height: 100%;
  //min-width: 100px;
  //min-height: 100px;
}
</style>
