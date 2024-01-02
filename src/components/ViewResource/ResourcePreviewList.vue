<script lang="tsx">
import { defineComponent, type PropType } from "vue";
import { ResourceGroup } from "@/schema/schema.ts";
import ResourceHandler from "./ResourceHandler.vue";

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<ResourceGroup[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="flex flex-col max-w-full w-full overflow-hidden">
        {props.list.map((group) => (
          <>
            {group.title && <h3 class="group-title">{group.title}</h3>}
            <div class="flex gap-[20px] max-w-full">
              {group.resources.map((resource) => (
                <ResourceHandler resource={resource} />
              ))}
            </div>
          </>
        ))}
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.group-title {
  z-index: 1;
  margin: 10px 0;
  color: var(--color-text-2);
  position: sticky;
  top: 0;
  background: var(--color-bg-1);
}
</style>
