<script lang="tsx">
import { defineComponent, computed, type PropType } from "vue";
import xmljs from "xml-js";

import MonacoEditor from "../Monaco/Index.vue";

import { Resource } from "@/schema/schema.ts";

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
    // const xmlJson = computed(() =>
    //   xmljs.xml2json(props.resource.origin, {
    //     spaces: 2,
    //   }),
    // );
    return () => (
      <div class="c-xml-handler">
        <MonacoEditor
          value={props.resource.origin}
          options={{ language: "xml" }}
        />
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.c-xml-handler {
  width: 100%;
  height: 300px;
}
</style>
