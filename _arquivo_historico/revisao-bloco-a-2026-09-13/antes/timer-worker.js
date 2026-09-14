// Web Worker dedicado para ticks de timer — imune a throttling de abas
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
