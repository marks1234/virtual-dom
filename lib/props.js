export function setProps($target, props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}
function setBooleanProp($target, name, value) {
  console.log($target[name]);
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
  return false;
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