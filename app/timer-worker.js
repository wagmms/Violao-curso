// Ticks auxiliares. A duração é calculada por timestamp, não por número de ticks.
let intervalId = null;

self.onmessage = function(e) {
  if (e.data === 'start') {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => self.postMessage('tick'), 500);
  } else if (e.data === 'stop') {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }
};
