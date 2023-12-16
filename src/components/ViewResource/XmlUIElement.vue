<script lang="tsx">
import { computed, defineComponent, type PropType, toRef } from "vue";
import { Input } from "@arco-design/web-vue";
import { type Element } from "xml-js";

const XmlUIElement = defineComponent({
  props: {
    element: {
      type: Object as PropType<Element>,
      required: true,
    },
  },
  setup(props) {
    const element = toRef(props, "element");
    const textChildren = computed(() =>
      (element.value.elements || []).filter((item) => item.type === "text"),
    );
    const otherChildren = computed(() =>
      (element.value.elements || []).filter((item) => item.type !== "text"),
    );
    return () => {
      switch (element.value.type) {
        case "element": {
          return (
            <>
              <div class="xml-element">
                <Input
                  class="xml-tag"
                  size="mini"
                  modelValue={element.value.name || ""}
                  v-slots={{ prefix: () => "<", suffix: () => ">" }}
                />
                <div class="xml-attrs">
                  {Object.entries(element.value.attributes || {}).map(
                    ([key, value]) => (
                      <div class="xml-attr">
                        <Input
                          class="xml-attr-name"
                          size="mini"
                          modelValue={key}
                        />
                        <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                        <Input
                          class="xml-attr-value"
                          size="mini"
                          modelValue={String(value ?? "")}
                        />
                      </div>
                    ),
                  )}
                </div>
                {textChildren.value.length > 0 && (
                  <div class="xml-text-elements">
                    &nbsp;值:&nbsp;&nbsp;
                    {textChildren.value.map((item) => (
                      <Input
                        style="width: 200px; position: inline"
                        size="mini"
                        modelValue={String(item.text ?? "")}
                      />
                    ))}
                  </div>
                )}
              </div>
              {otherChildren.value.length > 0 && (
                <div class="child-ele">
                  {otherChildren.value.map((element) => (
                    <XmlUIElement element={element} />
                  ))}
                </div>
              )}
            </>
          );
        }
        case "text": {
          return (
            <Input size="mini" modelValue={String(element.value.text ?? "")} />
          );
        }
        case "comment": {
          return <div class="xml-comment">说明：{element.value.comment}</div>;
        }
      }
    };
  },
});

export default XmlUIElement;
</script>

<style lang="less" scoped>
.xml-element {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  margin-bottom: 10px;
  color: var(--color-text-1);
  .xml-tag {
    width: 150px;
    margin-right: 10px;
  }
  .xml-attr-name {
    width: 100px;
  }
  .xml-attr-value {
    width: 300px;
  }
  .xml-attrs {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    .xml-attr {
      margin-bottom: 10px;
    }
  }

  .xml-text-elements {
    margin-left: 10px;
    flex-shrink: 0;
  }
}

.xml-comment {
  margin: 10px 0;
  color: var(--color-text-1);
}

.child-ele {
  display: inline-flex;
  margin: 0 10px;
  flex-direction: column;
}
</style>
