import { updateElement } from "./framework/create_element.js";
import { State } from "./framework/state.js";
import { CustomElement } from "./framework/types.js";



const comp = <ul className='list' style='list-style: none;'> <li>item 1</li><li>item 2</li></ul>

const app = (name: string): CustomElement => {
    let text = "Wow"




    const MY_HTML = <ul style="list-style: none;">
        <li className="item">item 1</li>
        <li className="item">

            <input type="checkbox" forceUpdate={true} checked={bool} />
            <input type="text" placeholder={name} onChange={(event) => {
                console.log(event.target.value)
                text = event.target.value
            }} />


        </li>
        <li className="item">
            <p>{text}</p>
        </li>
        <li>
            {($parent) => app2($parent)}
        </li>
    </ul> as unknown as CustomElement



    const appState = new State<string>(text)
    appState.subscribe((data: string) => {
        text = data
    })




    return MY_HTML
};



const app2 = ($parent: HTMLElement) => {
    console.log($parent)
    return (
        <ul className=' list'><li>item 1</li><li>item 2</li></ul> as unknown as CustomElement
    );
}


const $root = document.getElementById("root") as HTMLElement

console.log()

const marco = app("marco")
let bool = true


updateElement($root, marco)
