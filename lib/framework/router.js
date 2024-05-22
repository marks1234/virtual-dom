import { reloadHandler } from "../core.js";
export class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', () => this.loadRoute(this.getCurrentPath()));
    this.loadInitialRoute();
  }
  addRoute(path, component) {
    this.routes[path] = component;
  }
  navigate(path) {
    window.location.hash = path;
  }
  loadRoute(path) {
    var component = this.routes[path] || this.routes['/404'];
    if (component) {
      reloadHandler.reload(component);
    }
  }
  loadInitialRoute() {
    this.loadRoute(this.getCurrentPath());
  }
  getCurrentPath() {
    return window.location.hash.replace('#', '') || '/';
  }
}