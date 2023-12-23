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
      <div class="c-file-list">
        {props.list.map((group) => (
          <>
            {group.title && <h3 class="group-title">{group.title}</h3>}
            <div class="resources">
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
.c-file-list {
  display: flex;
  flex-direction: column;
  // padding: 10px;
  width: 100%;
  .divide {
    color: var(--color-text-1);
  }
  .resources {
    display: flex;
    grid-gap: 20px;
    // height: 100%;
  }
  .group-title {
    z-index: 1;
    margin: 10px 0;
    color: var(--color-text-2);
    position: sticky;
    top: 0;
    background: var(--color-bg-1);
  }
}
</style>
