// { type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
// { type: ‘li’, props: { }, children: [‘item 1’] },
// { type: ‘li’, props: { }, children: [‘item 2’] }
// ] }

import { addEventListeners, setProps, updateProps } from "./props.js";
import { CustomElement } from "./types.js";


// function h(type: string, props: Props, ...children: (CustomElement | string)[]): CustomElement {

//     return { type, props, children }
// }



function createElement(node: CustomElement | string) {
    if (typeof node == "string") {
        return document.createTextNode(node)
    }
    const $el = document.createElement(node.type)
    setProps($el, node.props)
    addEventListeners($el, node.props)
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el
}

function updateElement($parent: HTMLElement, newNode: CustomElement | string | undefined = undefined, oldNode: CustomElement | string | undefined = undefined, index = 0) {

    if (!oldNode) {
        if (newNode)
            $parent.appendChild(createElement(newNode))
    } else if (!newNode) {
        $parent.removeChild(
            $parent.childNodes[index]
        )
    } else if (changed(newNode, oldNode)) {
        console.log("PROPS >>>", oldNode)
        console.log($parent.replaceChild)
        $parent.replaceChild(
            createElement(newNode), $parent.childNodes[index]
        )
    } else if (typeof newNode != "string" && typeof oldNode != "string") {
        updateProps($parent.childNodes[index] as HTMLElement, newNode.props, oldNode.props)
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for (let i = 0; i < newLength || i < oldLength; i++) {
            console.log($parent)
            updateElement(
                $parent.childNodes[index] as HTMLElement,
                newNode.children[i],
                oldNode.children[i],
                i
            )
        }

    }
}

function changed(node1: CustomElement | string, node2: CustomElement | string) {
    if (typeof node1 !== "string" && typeof node2 !== "string") {
        if (node2.props && node2.props.forceUpdate) return true
        return node1.type !== node2.type ||
            node2.props && node2.props.forceUpdate;

    }
    return typeof node1 !== typeof node2 || typeof node1 === "string" && node1 !== node2
}


const comp = <ul className='list' style='list-style: none;'> <li>item 1</li><li>item 2</li></ul>

const app = (name: string): CustomElement => {
    // const func: ((event: Event) => void) = () => { }
    // console.log(typeof func)
    const bool = name == "Tom" ? true : false
    return <ul style="list-style: none;">
        <li className="item">item 1</li>
        <li className="item">
            <input type="checkbox" checked={bool} />
            <input type="text" disabled={!bool} placeholder={name} />
        </li>
    </ul> as unknown as CustomElement



    // return (<div className="app">
    //     <h1>Hello, JSX without React!</h1>
    //     <button onClick={() => {
    //         console.log("test")
    //     }
    //     }>Click me, {name}! {comp} </button>
    //     <pre>{JSON.stringify(app2(), undefined, 2)}</pre>
    // </div>) as unknown as CustomElement
};


const app2 = () => (
    <ul className=' list'><li>item 1</li><li>item 2</li></ul> as unknown as CustomElement
);
console.log()

// document.body.appendChild(updateElement(app() as unknown as CustomElement));
// document.body.appendChild(updateElement(app2() as unknown as CustomElement));
const $body = document.getElementById("root") as HTMLElement
const $load = document.getElementById("load")


const marco = app("marco")
let bool = true
updateElement($body, marco)
updateElement($body, app2())
$load?.addEventListener('click', () => {
    const tom = app("Tom")
    if (bool) {
        updateElement($body, tom, marco)

    } else {
        updateElement($body, marco, tom)
    }
    bool = bool ? false : true
})
document.body.appendChild(app2() as unknown as Node);
// ----------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------

// {
//     body {
//         ul{
//             test
//         }
//         ul{
//             pararaftest
//         }
//         p{
//             dsadasdas
//         }
//     }
// }