import { updateElement } from "./framework/create_element.js";
import { CustomElement } from "./framework/types.js";

export const rerun = (old_instance: CustomElement | undefined = undefined) => {
    const new_instance = core()
    updateElement($root, new_instance, old_instance)
    return () => rerun(new_instance)
}


const core = (): CustomElement => {
    // The App function call goes here 
    return <> "SUCK ME"</>
}


const $root = document.getElementById("root") as HTMLElement

export const marco = core()
let bool = true

updateElement($root, marco)


