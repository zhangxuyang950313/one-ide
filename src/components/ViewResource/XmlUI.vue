<script lang="tsx">
import xmljs from "xml-js";
import { defineComponent, computed } from "vue";
import { Select } from "@arco-design/web-vue";
import {
  parseXmlTags,
  parseXmlAttrs,
  parseXmlAttrValues,
  parseXmlChildrenContent,
  // filterElement,
} from "@/utils/xml.ts";
import XmlUIElement from "./XmlUIElement.vue";

export default defineComponent({
  props: {
    xml: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const xmlData = computed(() => xmljs.xml2js(props.xml) as xmljs.Element);
    console.log(xmlData.value);
    const tags = computed(() => parseXmlTags(xmlData.value));
    const attrs = computed(() => parseXmlAttrs(xmlData.value));
    const attrValues = computed(() => parseXmlAttrValues(xmlData.value));
    const contentValues = computed(() =>
      parseXmlChildrenContent(xmlData.value),
    );

    // const elementsFiltered = computed(() =>
    //   filterElement(xmlData.value, "color"),
    // );
    //
    // console.log({ elementsFiltered: elementsFiltered.value });
    return () => (
      <div class="c-xml-ui">
        <div class="filter-items">
          <Select
            class="tag-filter"
            style="width:150px; margin-right:10px"
            options={tags.value}
            placeholder="标签"
          />
          <Select
            class="attr-filter"
            style="width:100px;"
            options={attrs.value}
            placeholder="属性名"
          />
          &nbsp;&nbsp;:&nbsp;&nbsp;
          <Select
            class="attr-value-filter"
            style="width:300px; margin-right:10px"
            options={attrValues.value}
            placeholder="属性值"
          />
          <Select
            class="attr-value-filter"
            style="width:250px; margin-right:10px"
            options={contentValues.value}
            placeholder="子元素"
          />
        </div>
        <div class="xml-ui-elements">
          {(xmlData.value.elements || []).map((element) => (
            <XmlUIElement element={element} />
          ))}
        </div>
      </div>
    );
  },
});
</script>

<style lang="less" scoped>
.c-xml-ui {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.filter-items {
  display: flex;
  row-gap: 10px;
  align-items: center;
  margin-bottom: 40px;

  .tag-filter {
    width: 150px;
    margin-right: 10px;
  }

  .attr-filter {
    width: 100px;
    margin-right: 20px;
  }
}
.xml-ui-elements {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
</style>
