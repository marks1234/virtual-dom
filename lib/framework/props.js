export function setProps($target, props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}
function setBooleanProp($target, name, value) {
  // console.log($target[name])
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}
function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}
function removeProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === "className") {
    $target.removeAttribute("class");
  } else if (typeof value === "boolean") {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}
function isCustomProp(name) {
  return isEventProp(name) || name === "forceUpdate";
}
function setProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}
function updateProp($target, name, newVal, oldVal) {
  // if (typeof newVal !== "string") return
  if (!newVal) {
    removeProp($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp($target, name, newVal);
  }
}
export function updateProps($target, newProps) {
  var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var allProps = Object.assign({}, newProps, oldProps);
  Object.keys(allProps).forEach(key => {
    updateProp($target, key, newProps[key], oldProps[key]);
  });
}
export function addEventListeners($target, props) {
  Object.keys(props).forEach(name => {
    // if (typeof props[name]  )
    if (isEventProp(name) && typeof props[name] === "function") {
      $target.addEventListener(extractEventName(name), props[name]);
    }
  });
}
function isEventProp(name) {
  return /^on/.test(name);
}
function extractEventName(name) {
  return name.slice(2).toLowerCase();
}