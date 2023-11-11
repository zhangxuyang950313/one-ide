import { type Element } from "xml-js";

export function parseXmlTags(element: Element) {
  const tags: string[] = [];
  if (element.type === "element" && element.name) {
    tags.push(element.name);
  }
  if (Array.isArray(element.elements)) {
    element.elements.forEach((item) => {
      tags.push(...parseXmlTags(item));
    });
  }
  return Array.from(new Set(tags));
}

export function parseXmlAttrs(element: Element) {
  const attrs: string[] = [];
  if (element.type === "element" && element.attributes) {
    attrs.push(...Object.keys(element.attributes));
  }
  if (Array.isArray(element.elements)) {
    element.elements.forEach((item) => {
      attrs.push(...parseXmlAttrs(item));
    });
  }
  return Array.from(new Set(attrs));
}

export function parseXmlAttrValues(element: Element) {
  const values: string[] = [];
  if (element.type === "element" && element.attributes) {
    values.push(
      ...Object.values(element.attributes).map((item) =>
        typeof item === "number" ? String(item) : item || "",
      ),
    );
  }
  if (Array.isArray(element.elements)) {
    element.elements.forEach((_element) => {
      values.push(...parseXmlAttrValues(_element));
    });
  }
  return Array.from(new Set(values));
}

export function parseXmlChildrenContent(element: Element) {
  const contents: string[] = [];
  if (element.type === "text") {
    contents.push(String(element.text));
  } else if (Array.isArray(element.elements)) {
    element.elements.forEach((item) => {
      contents.push(...parseXmlChildrenContent(item));
    });
  }
  return Array.from(new Set(contents));
}

// export function filterElement(
//   ele: Element,
//   tag?: string,
//   attr?: string,
//   attrName?: string,
//   content?: string,
// ): Element {
//   if (Array.isArray(ele.elements)) {
//     const elements: Element[] = [];
//     ele.elements.map((item) => {});
//     return {
//       ...ele,
//       elements,
//     };
//   }
// }
