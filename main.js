import Machine from "./src/components/Machine.js";

function machinePlay() {
  const machine1 = new Machine();
  const machine2 = new Machine();
  machine1.on();
  machine2.on();
}

machinePlay();
