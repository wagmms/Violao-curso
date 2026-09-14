const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('c:/Users/wmors/Documents/ChatGPT/Violão/interface-v2/index.html', 'utf8');

const jsdom = require('jsdom');
const virtualConsole = new jsdom.VirtualConsole();

virtualConsole.on("error", (...args) => {
  console.log("JSDOM Error:", ...args);
});
virtualConsole.on("warn", (...args) => {
  console.log("JSDOM Warn:", ...args);
});
virtualConsole.on("info", (...args) => {
  console.log("JSDOM Info:", ...args);
});
virtualConsole.on("log", (...args) => {
  console.log("JSDOM Log:", ...args);
});

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'file:///c:/Users/wmors/Documents/ChatGPT/Violão/interface-v2/index.html',
  virtualConsole
});

setTimeout(() => {
    console.log("App test api is:", !!dom.window.__APP_TEST_API);
}, 2000);
