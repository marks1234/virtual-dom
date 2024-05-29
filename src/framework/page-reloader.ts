import { CustomElement } from "./types.js"
import { updateElement } from "./create_element.js"

type ComponentFunction = () => CustomElement;

export class Reloader {
  private old_instance: CustomElement
  private parent: HTMLElement
  private component: ComponentFunction

  constructor($root: HTMLElement, first_instance: ComponentFunction) {
    this.component = first_instance
    this.old_instance = first_instance()
    updateElement($root, this.old_instance)
    this.parent = $root
  }

  refresh() {
    const t = this.component()
    // console.log("old_inst >>>", this.old_instance)
    // console.log("NEW_inst >>>", t)
    updateElement(this.parent, t, this.old_instance)
    this.old_instance = JSON.parse(JSON.stringify(t))
  }

  reload(new_component: ComponentFunction) {
    const new_inst = new_component()
    this.parent.innerHTML = ""
    updateElement(this.parent, new_inst)
    this.old_instance = JSON.parse(JSON.stringify(new_inst))
    this.component = new_component
  }
}

