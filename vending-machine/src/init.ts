// import './class/coinInput'
// import './class/dialButtons'
// import './class/display'
// import './class/insertButton'
// import './class/returnButton'
import './class/vendingMachine'
import { VendingMachine } from './class/vendingMachine'
import { dummyData } from './data'
import './style.css'

const vendingMachine = new VendingMachine(document.getElementById('app') as HTMLDivElement, dummyData)

vendingMachine.init()
