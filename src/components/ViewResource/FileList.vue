<script lang="tsx">
import { defineComponent, type PropType } from "vue";
import { ResourceGroup } from "@/schema/schema.ts";
import ImageHandler from "./FileImage.vue";
import XmlHandler from "./FileXml.vue";

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
            <h3 class="group-title">{group.title}</h3>
            <div class="resources" data-just-one={group.resources.length === 1}>
              {group.resources.map((resource) => {
                switch (true) {
                  case resource.mimeType.startsWith("image/"): {
                    return <ImageHandler resource={resource} />;
                  }
                  case resource.mimeType === "application/xml": {
                    return <XmlHandler resource={resource} />;
                  }
                  default: {
                    return null;
                  }
                }
              })}
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
  padding: 0 20px 20px;
  margin-top: 10px;
  width: 100%;
  .divide {
    color: var(--color-text-1);
  }
  .resources {
    display: flex;
    grid-gap: 20px;
    margin-bottom: 50px;
    &[data-just-one="true"] {
      height: 100%;
      margin-bottom: 0;
    }
  }
  .group-title {
    z-index: 1;
    margin: 0;
    padding: 10px 0;
    color: var(--color-text-2);
    position: sticky;
    top: 0;
    background: var(--color-bg-1);
  }
}
</style>
