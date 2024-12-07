import { elements } from '../../dom/index.js';
import { scrollToBottom } from '../../dom/index.js';

export const addLog = (message) => {
  const logEntry = document.createElement('p');
  logEntry.className = 'log-entry';
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  elements.logContainer.appendChild(logEntry);
  scrollToBottom(elements.logContainer);
};
