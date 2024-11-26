import Component from './core/Component.js';
import VendingMachine from './components/VendingMachine.js';

/** Main application component */
export default class App extends Component {
  template() {
    return `
    <div data-component="vending-machine"></div>
    `;
  }

  mounted() {
    new VendingMachine(
      this.$target.querySelector('[data-component="vending-machine"]')
    );
  }
}
