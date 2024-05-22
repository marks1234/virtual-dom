import { App } from "./app.js";
import { component2 } from "./comp1.js";
import { Router } from "./framework/router.js";
import { State } from "./framework/state.js";
import { Reloader } from "./framework/page-reloader.js";
var coreState = new State("LOLS");
var core = () => {
  var text = coreState.get();
  return h(frag, null, text, App(coreState));
};
export var router = new Router();
router.addRoute("/", core);
router.addRoute("/test", component2);
var $root = document.getElementById("root");
export var first_inst = core();
window.addEventListener('DOMContentLoaded', () => {
  router.loadInitialRoute();
});
export var reloadHandler = new Reloader($root, core);