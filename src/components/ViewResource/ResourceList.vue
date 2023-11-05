<script lang="tsx">
import { defineComponent, PropType } from "vue";

import ImageHandler from "./ImageHandler.vue";
import XmlHandler from "./XmlHandler.vue";

import { ResourceGroup } from "@/schema/schema.ts";

export default defineComponent({
  props: {
    resourceGroups: {
      type: Array as PropType<ResourceGroup[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="c-resource-list">
        {props.resourceGroups.map((group) => {
          return (
            <>
              <h3 class="group-title">{group.title}</h3>
              <div class="resources">
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
          );
        })}
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.c-resource-list {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  //height: 100%;
  .divide {
    color: var(--color-text-1);
  }
  .resources {
    display: flex;
    grid-gap: 20px;
    margin-bottom: 50px;
  }
  .group-title {
    margin: 0 0 20px;
    color: var(--color-text-2);
  }
}
</style>
