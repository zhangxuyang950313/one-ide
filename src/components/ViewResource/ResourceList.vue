<script lang="tsx">
import { computed, defineComponent, PropType } from "vue";
import ImageA from "./Image.vue";
import { TDivide, TElement, TResource } from "../../schema/schema.ts";

export default defineComponent({
  props: {
    elements: {
      type: Array as PropType<TElement[]>,
      required: true,
    },
  },
  setup(props) {
    const elements = computed(() => {
      const list: Array<TDivide | TResource[]> = [];
      for (const item of props.elements) {
        if (item.type === "divide") {
          list.push(item);
        } else if (item.type === "resource") {
          const last = list[list.length - 1];
          if (!Array.isArray(last)) {
            list.push([item]);
            continue;
          }
          last.push(item);
        }
      }
      return list;
    });

    return () => (
      <div class="c-resource-list">
        {elements.value.map((element) => {
          if (Array.isArray(element)) {
            return (
              <div class="resources">
                {element.map((resource) => {
                  switch (true) {
                    case resource.mimeType.startsWith("image/"): {
                      return <ImageA resource={resource} />;
                    }
                    default: {
                      return null;
                    }
                  }
                })}
              </div>
            );
          }
          if (element.type === "divide") {
            return <h2>{element.title}</h2>;
          }
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
  padding: 0 30px;
  .divide {
    color: var(--color-text-1);
  }
  .resources {
    display: flex;
    grid-gap: 20px;
  }
}
</style>
