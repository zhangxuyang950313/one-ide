<script lang="tsx">
import {
  ref,
  defineComponent,
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
        } as editor.IStandaloneEditorConstructionOptions;
      },
    },
  },
  emits: {
    "update:value": (_v: string) => true,
  },
  setup(props, ctx) {
    let editorIns: editor.IStandaloneCodeEditor;
    const modelValue = ref(props.value);
    const onVNodeMounted: VNodeRef = async (ref) => {
      if (!(ref instanceof HTMLDivElement)) return;
      editorIns = editor.create(ref, {
        ...props.options,
        value: props.value,
        automaticLayout: true,
      });
      editorIns.onDidChangeModelContent(() => {
        ctx.emit("update:value", editorIns.getValue());
      });
    };

    watchEffect(() => {
      editorIns?.setValue(modelValue.value);
    });

    return () => <div ref={onVNodeMounted} class="w-full h-full"></div>;
  },
});
</script>
