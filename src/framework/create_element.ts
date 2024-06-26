import { addEventListeners, setProps, updateProps } from "./props.js";
import { CustomElement } from "./types.js";

export function createElement(node: CustomElement | string) {
  if (typeof node == "string") {
    return document.createTextNode(node)
  }
  const $el = document.createElement(node.type)
  // console.log(node)
  // if (typeof node == "function") console.log(node)
  setProps($el, node.props)
  addEventListeners($el, node.props)
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el
}

export function updateElement($parent: HTMLElement, newNode: CustomElement | string | undefined = undefined, oldNode: CustomElement | string | undefined = undefined, index = 0) {
  // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("NEWNODE >>", newNode)
  if (!oldNode && typeof oldNode != "string") {
    // if (typeof newNode == "string") console.log("!oldNode")
    if (newNode)
      $parent.appendChild(createElement(newNode))
  } else if (!newNode && typeof newNode != "string") {
    // if (typeof newNode == "string") console.log("!newNode")
    $parent.removeChild(
      $parent.childNodes[index]
    )
    return -1
  } else if (changed(newNode, oldNode)) {
    // if (typeof newNode == "string") console.log("CHANGED")

    $parent.replaceChild(
      createElement(newNode), $parent.childNodes[index]
    )
  } else if (typeof newNode != "string" && typeof oldNode != "string") {
    // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("CHILD????")
    updateProps($parent.childNodes[index] as HTMLElement, newNode.props, oldNode.props)

    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    let removed = 0
    for (let i = 0; i < newLength || i < oldLength; i++) {

      // console.log("PARENT CHILDREN >>>", $parent.childNodes)
      const state = updateElement(
        $parent.childNodes[index] as HTMLElement,
        newNode.children[i],
        oldNode.children[i],
        i + removed
      )
      if (state == -1) removed += state
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
