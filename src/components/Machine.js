export default class Machine {
  machine;

  constructor() {
    this.machine = document.createElement("article");
    this.machine.classList.add("machine");

    document.querySelector("body").appendChild(this.machine);
  }

  on() {}
}
