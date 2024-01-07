import { ref, watch, toValue, type MaybeRefOrGetter } from "vue";

export function useImage(src: MaybeRefOrGetter<string | null | undefined>) {
  const loading = ref(true);
  const url = ref("");
  // 渲染大小
  const width = ref(0);
  const height = ref(0);
  // 原始大小
  const naturalWidth = ref(0);
  const naturalHeight = ref(0);

  watch(
    () => toValue(src),
    (v) => {
      if (!v) return;
      const image = new Image();
      loading.value = true;
      image.onload = () => {
        width.value = image.width;
        height.value = image.height;
        naturalWidth.value = image.naturalWidth;
        naturalHeight.value = image.naturalHeight;
        url.value = v;
        loading.value = false;
      };
      image.onerror = () => {
        url.value = "";
        loading.value = false;
      };
      image.src = v;
    },
    { immediate: true },
  );

  return {
    loading,
    url,
    width,
    height,
    naturalWidth,
    naturalHeight,
  };
}
