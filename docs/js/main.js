import '../lib/browser-window.js';

const isLocalhost = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/lorem-ipsum.js' : '../lib/lorem-ipsum.js';

import(componentUrl).then(res => {
  const { LoremIpsum } = res;
  LoremIpsum.defineCustomElement();

  const el = document.querySelector('lorem-ipsum');
  const form = document.querySelector('form');

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const formData = new FormData(form);
    const count = formData.get('count');
    const lists = !!formData.get('lists');
    const startWithLorem = !!formData.get('start-with-lorem');

    el.setAttribute('count', count);
    el.toggleAttribute('lists', lists);
    el.toggleAttribute('start-with-lorem', startWithLorem);
    el.generate();

    const code = document.querySelector('#source-code');
    const template = `<lorem-ipsum count="${count}"${lists ? ' lists' : ''}${startWithLorem ? ' start-with-lorem' : ''}></lorem-ipsum>`;
    code.textContent = template;
    window.hljs.highlightElement(code);
  });
}).catch(err => {
  console.error(err);
});
