import "./style.css";
import { createRoot } from "./core/createRoot.js";

const root = createRoot(document.getElementById("app"));

document.addEventListener("DOMContentLoaded", () => {
  root.render(<div>hello world</div>);
});
