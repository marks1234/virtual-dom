import { reloadHandler } from "../core.js";
import { createElement, updateElement } from "./create_element.js";
import { CustomElement } from "./types.js";

type ComponentFunction = () => CustomElement;

export class Router {
  private routes: { [path: string]: ComponentFunction };

  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', () => this.loadRoute(this.getCurrentPath()));
    this.loadInitialRoute();
  }

  addRoute(path: string, component: ComponentFunction): void {
    this.routes[path] = component;
  }

  navigate(path: string): void {
    window.location.hash = path;
  }

  loadRoute(path: string): void {
    const component = this.routes[path] || this.routes['/404'];

    if (component) {
      reloadHandler.reload(component)
    }
  }

  loadInitialRoute(): void {
    this.loadRoute(this.getCurrentPath());
  }

  getCurrentPath(): string {
    return window.location.hash.replace('#', '') || '/';
  }
}