import '../lib/browser-window.js';

const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/lorem-ipsum.js' : '../lib/lorem-ipsum.js';

import(componentUrl).then(res => {
  const { LoremIpsum } = res;
  LoremIpsum.defineCustomElement();
}).catch(err => {
  console.error(err);
});
