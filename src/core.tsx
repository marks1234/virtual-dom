import { App } from "./app.js";
import { updateElement } from "./framework/create_element.js";
import { CustomElement } from "./framework/types.js";
import { component2 } from "./comp1.js";
import { Router } from "./framework/router.js"
import { State } from "./framework/state.js";
import { Reloader } from "./framework/page-reloader.js";



const coreState = new State<string>("LOLS")
const core = (): CustomElement => {
    const text = coreState.get()
    return <>
        {text}
        {App(coreState)}
    </>
}

export const router = new Router()
router.addRoute("/", core)
router.addRoute("/test", component2)

const $root = document.getElementById("root") as HTMLElement

export const first_inst = core()
window.addEventListener('DOMContentLoaded', () => {
    router.loadInitialRoute();
})

export const reloadHandler = new Reloader($root, core)


