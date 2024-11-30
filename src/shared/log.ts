export type TLogService = {
  track: (log: string) => void;
};

export const createLogService = (
  logWindowElement: HTMLDivElement,
): TLogService => {
  const logs: Array<string> = [];

  const track = (log: string) => {
    logs.push(log);
    console.log(log);
    show(log);
  };

  const show = (log: string) => {
    const p = document.createElement('p');

    p.className = 'log-window_paragraph';
    p.innerHTML = log;

    logWindowElement.appendChild(p);
    logWindowElement.scrollTop = logWindowElement.scrollHeight;
  };

  return { track };
};
