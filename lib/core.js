import { updateElement } from "./framework/create_element.js";
export var rerun = function rerun() {
  var old_instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var new_instance = core();
  updateElement($root, new_instance, old_instance);
  return () => rerun(new_instance);
};
var core = () => {
  // The App function call goes here 
  return h(frag, null, " \"SUCK ME\"");
};
var $root = document.getElementById("root");
export var marco = core();
var bool = true;
updateElement($root, marco);