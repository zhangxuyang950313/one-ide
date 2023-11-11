import { defineStore } from "pinia";
import XiaomiMiui12 from "@/assets/configures/xiaomi/miui12";
import { useIdeState } from "../use/useIdeState.ts";

export const useIdeStateStore = defineStore(
  "__ide_state__", //
  () => useIdeState(new XiaomiMiui12()),
);
