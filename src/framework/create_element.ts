import { addEventListeners, setProps, updateProps } from "./props.js";
import { CustomElement } from "./types.js";

function createElement(node: CustomElement | string) {
  if (typeof node == "string") {
    return document.createTextNode(node)
  }
  const $el = document.createElement(node.type)
  console.log(node)
  if (typeof node == "function") console.log(node)
  setProps($el, node.props)
  addEventListeners($el, node.props)
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el
}

export function updateElement($parent: HTMLElement, newNode: CustomElement | string | undefined = undefined, oldNode: CustomElement | string | undefined = undefined, index = 0) {
  // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("NEWNODE >>", newNode)
  if (!oldNode) {
    // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("!oldNode")
    // console.log("!oldNode")
    if (newNode)
      $parent.appendChild(createElement(newNode))
  } else if (!newNode) {
    // if (typeof newNode != "string" && newNode && newNode.type == "input") console.log("!newNode")
    // console.log("!newNode")
    $parent.removeChild(
      $parent.childNodes[index]
    )
  } else if (changed(newNode, oldNode)) {
    // if (typeof newNode != "string" && newNode && newNode.type == "input") console.log("CHANGED")
    // console.log("PROPS >>>", oldNode)
    // console.log($parent.replaceChild)
    $parent.replaceChild(
      createElement(newNode), $parent.childNodes[index]
    )
  } else if (typeof newNode != "string" && typeof oldNode != "string") {
    // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("CHILD????")
    updateProps($parent.childNodes[index] as HTMLElement, newNode.props, oldNode.props)
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      // console.log($parent)
      updateElement(
        $parent.childNodes[index] as HTMLElement,
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }

  }
}

// function changed(node1, node2) {
//   return typeof node1 !== typeof node2 ||
//     typeof node1 === 'string' && node1 !== node2 ||
//     node1.type !== node2.type ||
//     node1.props && node1.props.forceUpdate;
// }
function changed(node1: CustomElement | string, node2: CustomElement | string) {
  if (typeof node1 !== "string" && typeof node2 !== "string") {
    if (node2.props && node2.props.forceUpdate) return true
    return node1.type !== node2.type ||
      node1.props && node1.props.forceUpdate;

  }
  return typeof node1 !== typeof node2 || typeof node1 === "string" && node1 !== node2
}
