import { addEventListeners, setProps, updateProps } from "./props.js";
function createElement(node) {
  var $parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (typeof node == "function") {
    console.log(node);
    if (!$parent) {
      return createElement({
        type: "p",
        props: {},
        children: ["SOMETHING WENT WRONG HANDLING THE CHILD ELEMENT", {
          type: "br",
          props: {},
          children: []
        }, "---------------------------------------------------------------------------------------", {
          type: "br",
          props: {},
          children: []
        }, "CHILD >>> ".concat(typeof node), {
          type: "br",
          props: {},
          children: []
        }, "---------------------------------------------------------------------------------------", {
          type: "br",
          props: {},
          children: []
        }, "PARENT >>> ".concat($parent)]
      });
    }
    node = node($parent);
    console.log(node);
  }
  if (typeof node == "string") {
    return document.createTextNode(node);
  }
  var $el = document.createElement(node.type);
  console.log(node);
  setProps($el, node.props);
  addEventListeners($el, node.props);
  node.children.map(val => createElement(val, $el)).forEach($el.appendChild.bind($el));
  return $el;
}
export function updateElement($parent) {
  var newNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var oldNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("NEWNODE >>", newNode)
  if (!oldNode) {
    // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("!oldNode")
    // console.log("!oldNode")
    if (newNode) $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    // if (typeof newNode != "string" && newNode && newNode.type == "input") console.log("!newNode")
    // console.log("!newNode")
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    // if (typeof newNode != "string" && newNode && newNode.type == "input") console.log("CHANGED")
    // console.log("PROPS >>>", oldNode)
    // console.log($parent.replaceChild)
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (typeof newNode != "string" && typeof oldNode != "string") {
    // if (typeof newNode != "string" && newNode && newNode.type == "li") console.log("CHILD????")
    updateProps($parent.childNodes[index], newNode.props, oldNode.props);
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;
    for (var i = 0; i < newLength || i < oldLength; i++) {
      // console.log($parent)
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
}

// function changed(node1, node2) {
//   return typeof node1 !== typeof node2 ||
//     typeof node1 === 'string' && node1 !== node2 ||
//     node1.type !== node2.type ||
//     node1.props && node1.props.forceUpdate;
// }
function changed(node1, node2) {
  if (typeof node1 !== "string" && typeof node2 !== "string") {
    if (node2.props && node2.props.forceUpdate) return true;
    return node1.type !== node2.type || node1.props && node1.props.forceUpdate;
  }
  return typeof node1 !== typeof node2 || typeof node1 === "string" && node1 !== node2;
}