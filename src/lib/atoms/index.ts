import { uniqueId } from "lodash";
import { atom } from "recoil";

export const headerState = atom<string[]>({
  key: `headerState/${uniqueId()}`,
  default: [],
});
