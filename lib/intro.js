import { updateElement } from "./framework/create_element.js";
import { State } from "./framework/state.js";
var comp = h("ul", {
  className: "list",
  style: "list-style: none;"
}, " ", h("li", null, "item 1"), h("li", null, "item 2"));
var app = name => {
  var text = "Wow";
  var MY_HTML = h("ul", {
    style: "list-style: none;"
  }, h("li", {
    className: "item"
  }, "item 1"), h("li", {
    className: "item"
  }, h("input", {
    type: "checkbox",
    forceUpdate: true,
    checked: bool
  }), h("input", {
    type: "text",
    placeholder: name,
    onChange: event => {
      console.log(event.target.value);
      text = event.target.value;
    }
  })), h("li", {
    className: "item"
  }, h("p", null, text)), h("li", null, $parent => app2($parent)));
  var appState = new State(text);
  appState.subscribe(data => {
    text = data;
  });
  return MY_HTML;
};
var app2 = $parent => {
  console.log($parent);
  return h("ul", {
    className: " list"
  }, h("li", null, "item 1"), h("li", null, "item 2"));
};
var $root = document.getElementById("root");
console.log();
var marco = app("marco");
var bool = true;
updateElement($root, marco);