"use strict";




// function createElement(tag, props) {
//   for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
//     children[_key - 2] = arguments[_key];
//   }
//   if (typeof tag === "function") {
//     return tag(props, ...children);
//   }
//   const element = document.createElement(tag);
//   Object.entries(props || {}).forEach(_ref => {
//     let [name, value] = _ref;
//     if (name.startsWith("on") && name.toLowerCase() in window) {
//       element.addEventListener(name.toLowerCase().substr(2), value);
//     } else {
//       element.setAttribute(name, value.toString());
//     }
//   });
//   children.forEach(child => {
//     if (Array.isArray(child)) {
//       child.forEach(nestedChild => element.appendChild(nestedChild));
//     } else {
//       element.appendChild(child instanceof Node ? child : document.createTextNode(child));
//     }
//   });
//   return element;
// }

function h(type, props, ...children) {
  return { type, props: props || {}, children };
}


