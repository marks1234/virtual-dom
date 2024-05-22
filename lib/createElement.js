"use strict";

function h(type, props, ...children) {

  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        // Replace `children[i]` (an array) with all of its items
        children.splice(i, 1, ...children[i]);
        i += children[i].length - 1; // Adjust i to skip the newly added elements
      }
    }
  }


  return { type, props: props || {}, children: children || [] };
}

const frag = "div"


