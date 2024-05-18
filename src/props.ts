import { Props } from "./types"


export function setProps($target: HTMLElement, props: Props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name])
  })
}


function setBooleanProp($target: any, name: string, value: any) {
  console.log($target[name])
  if (value) {
    $target.setAttribute(name, value)
    $target[name] = true
  } else {
    $target[name] = false
  }
}

function removeBooleanProp($target: any, name: string) {
  $target.removeAttribute(name);
  $target[name] = false;
}

function removeProp($target: HTMLElement, name: string, value: string) {
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

function isCustomProp(name: string) {
  return false;
}
function setProp($target: HTMLElement, name: string, value: any) {
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

function updateProp($target: HTMLElement, name: string, newVal: string, oldVal: string) {
  if (!newVal) {
    removeProp($target, name, oldVal)
  } else if (!oldVal || newVal !== oldVal) {
    setProp($target, name, newVal)
  }
}

export function updateProps($target: HTMLElement, newProps: Props, oldProps: Props = {}) {
  const allProps = Object.assign({}, newProps, oldProps)
  Object.keys(allProps).forEach(key => {
    updateProp($target, key, newProps[key], oldProps[key])
  })
}