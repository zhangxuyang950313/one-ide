import { defineStore } from "pinia";

import { useIdeState } from "../use/useIdeState.ts";

import XiaomiMiui12 from "@/assets/configures/xiaomi/miui12";

export const useIdeStateStore = defineStore(
  "__ide_state__", //
  () => useIdeState(new XiaomiMiui12()),
);
