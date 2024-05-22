import { App } from "./app.js";
import { CustomElement } from "./framework/types.js";
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

const $root = document.getElementById("root") as HTMLElement

export const first_inst = core()
window.addEventListener('DOMContentLoaded', () => {
    router.loadInitialRoute();
})

export const reloadHandler = new Reloader($root, core)


