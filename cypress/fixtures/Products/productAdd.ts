import { v4 as uuidv4 } from "uuid";

export const product = {
  name: "Cytest" + uuidv4(),
  code: uuidv4().replaceAll("-", "").replaceAll(/[a-z]/gi, "").slice(0, 12)
};
