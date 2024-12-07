export default class Element {
  element;
  version;

  constructor(tag, parent, className, version) {
    this.element = document.createElement(tag);
    this.element.className = className;
    this.version = version;
    parent.appendChild(this.element);
  }
}
