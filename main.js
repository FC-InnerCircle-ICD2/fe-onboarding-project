import Machine from "./src/components/Machine.js";

function machinePlay() {
  const machine1 = new Machine("version1");
  const machine2 = new Machine("version2");
  machine1.on();
  machine2.on();
}

machinePlay();
