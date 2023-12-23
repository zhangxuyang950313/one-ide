import { toValue, ref, MaybeRefOrGetter } from "vue";

export function useImage(src: MaybeRefOrGetter<string>) {
  const loading = ref(false);
  const url = ref("");
  const image = new Image();
  image.onload = () => {
    url.value = toValue(src);
    loading.value = false;
  };
  image.onerror = () => {
    loading.value = false;
  };

  return {
    loading,
    url,
  };
}
