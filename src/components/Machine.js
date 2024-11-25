import InputField from "./input/InputField.js";

export default class Machine {
  constructor(version) {
    this.version = version;
    this.machine = document.createElement("article");
    this.machine.className = `machine ${version}`;

    document.querySelector("body").appendChild(this.machine);
  }

  on() {
    const inputField = new InputField(this.version);
    this.machine.appendChild(inputField.element);
  }
}
