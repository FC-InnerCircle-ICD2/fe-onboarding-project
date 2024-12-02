import InputField from "./input/InputField.js";
import OutputField from "./output/OutputField.js";

export default class Machine {
  constructor(version) {
    this.version = version;
    this.machine = document.createElement("article");
    this.machine.className = `machine ${version}`;

    document.querySelector("body").appendChild(this.machine);
  }

  on() {
    const inputField = new InputField(this.version);
    const outputField = new OutputField(this.version);
    this.machine.appendChild(inputField.element);
    this.machine.appendChild(outputField.element);
  }
}
