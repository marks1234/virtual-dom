"use strict";

// { type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
// { type: ‘li’, props: { }, children: [‘item 1’] },
// { type: ‘li’, props: { }, children: [‘item 2’] }
// ] }

//** @jsx createElement */

// Assuming a basic Props type, adjust as needed

function h(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  return {
    type: type,
    props: props,
    children: children
  };
}
console.log(h('ul', {
  "class": "list"
}, h('li', {}, 'item 1'), h('li', {}, 'item 2')));
console.log(createElement("ul", {
  className: " list"
}, createElement("li", null, "item 1"), createElement("li", null, "item 2")));
var app = function app() {
  return createElement("div", {
    className: "app"
  }, createElement("h1", null, "Hello, JSX without React!"), createElement("button", {
    onClick: function onClick() {
      return alert('Clicked!');
    }
  }, "Click me"));
};
var app2 = function app2() {
  return createElement("ul", {
    className: " list"
  }, createElement("li", null, "item 1"), createElement("li", null, "item 2"));
};
document.body.appendChild(app());
document.body.appendChild(app2());
// document.body.appendChild(App());