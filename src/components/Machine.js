import InputField from "./input/InputField.js";

export default class Machine {
  constructor() {
    this.machine = document.createElement("article");
    this.machine.classList.add("machine");

    document.querySelector("body").appendChild(this.machine);
  }

  on() {
    const inputField = new InputField(this.machine);
    inputField.init();
  }
}
