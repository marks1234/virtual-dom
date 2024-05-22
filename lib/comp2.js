import { router } from "./core.js";
export var component1 = () => {
  return h("p", null, "THIS IS COMP1", h("button", {
    onClick: () => {
      router.navigate('/test');
    }
  }, " "));
};