import { envsafe, str } from "envsafe";

export const env = envsafe({
  NAME: str({
    default: "Nexus",
  }),
});
