import { defineStore } from "pinia";
import { useIdeState } from "../use/useIdeState.ts";

export const useIdeStateStore = defineStore("__ide_state__", useIdeState);
