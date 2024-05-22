import { updateElement } from "./create_element.js";
export class Reloader {
  constructor($root, first_instance) {
    this.component = first_instance;
    this.old_instance = first_instance();
    updateElement($root, this.old_instance);
    this.parent = $root;
  }
  refresh() {
    var t = this.component();
    updateElement(this.parent, t, this.old_instance);
    this.old_instance = t;
  }
  reload(new_component) {
    var new_inst = new_component();
    updateElement(this.parent, new_inst, this.old_instance);
    this.old_instance = new_inst;
    this.component = new_component;
  }
}