// { type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
// { type: ‘li’, props: { }, children: [‘item 1’] },
// { type: ‘li’, props: { }, children: [‘item 2’] }
// ] }

import { setProps } from "./props.js";
// function h(type: string, props: Props, ...children: (CustomElement | string)[]): CustomElement {

//     return { type, props, children }
// }

function createElement(node) {
  if (typeof node == "string") {
    return document.createTextNode(node);
  }
  var $el = document.createElement(node.type);
  setProps($el, node.props);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}
function updateElement($parent) {
  var newNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var oldNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  console.log("NEW >>>", newNode);
  console.log("OLD >>>", oldNode);
  // if (!$parent) {
  //     console.log("HOW HERE ????")
  //     return
  // }
  if (!oldNode) {
    console.log("!oldNode");
    if (newNode) $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    console.log("!newNode");
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    console.log("changed");
    console.log($parent.replaceChild);
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (typeof newNode != "string" && typeof oldNode != "string") {
    console.log("next child");
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;
    for (var i = 0; i < newLength || i < oldLength; i++) {
      console.log($parent);
      updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
}
function changed(node1, node2) {
  if (typeof node1 !== "string" && typeof node2 !== "string") return node1.type !== node2.type;
  return typeof node1 !== typeof node2 || typeof node1 === "string" && node1 !== node2;
}
var comp = h("ul", {
  className: "list",
  style: "list-style: none;"
}, " ", h("li", null, "item 1"), h("li", null, "item 2"));
var app = name => {
  return h("ul", {
    style: "list-style: none;"
  }, h("li", {
    className: "item"
  }, "item 1"), h("li", {
    className: "item"
  }, h("input", {
    type: "checkbox",
    checked: true
  }), h("input", {
    type: "text",
    disabled: false,
    placeholder: name
  })));

  // return (<div className="app">
  //     <h1>Hello, JSX without React!</h1>
  //     <button onClick={() => {
  //         console.log("test")
  //     }
  //     }>Click me, {name}! {comp} </button>
  //     <pre>{JSON.stringify(app2(), undefined, 2)}</pre>
  // </div>) as unknown as CustomElement
};
var app2 = () => h("ul", {
  className: " list"
}, h("li", null, "item 1"), h("li", null, "item 2"));
console.log();

// document.body.appendChild(updateElement(app() as unknown as CustomElement));
// document.body.appendChild(updateElement(app2() as unknown as CustomElement));
var $body = document.getElementById("root");
var $load = document.getElementById("load");
updateElement($body, app("marco"));
updateElement($body, app2());
$load === null || $load === void 0 ? void 0 : $load.addEventListener('click', () => {
  updateElement($body, app("Tom"), app("marco"));
});
// document.body.appendChild(app2() as unknown as Node);

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