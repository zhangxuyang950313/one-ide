import { createAlova } from "alova";
import VueHooks from "alova/vue";
import { xhrRequestAdapter } from "@alova/adapter-xhr";

export const alovaFile = createAlova({
  baseURL: "one://",
  requestAdapter: xhrRequestAdapter(),
  statesHook: VueHooks,
  localCache: {
    GET: {
      expire: 0,
    },
  },
  beforeRequest(method) {
    method.config.responseType = "text";
  },
  responded(responded) {
    return responded.data;
  },
});
