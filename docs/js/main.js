import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/lorem-ipsum.js' : '../lib/lorem-ipsum.js';

import(componentUrl)
  .then(res => {
    const { LoremIpsum } = res;
    LoremIpsum.defineCustomElement();

    const loremIpsumEl = document.querySelector('lorem-ipsum');
    const formEl = document.querySelector('form');

    formEl.querySelector('#count').value = loremIpsumEl.getAttribute('count') || 1;
    formEl.querySelector('#lists').checked = loremIpsumEl.hasAttribute('lists');
    formEl.querySelector('#start-with-lorem').checked =
      loremIpsumEl.hasAttribute('start-with-lorem');

    formEl.addEventListener('submit', evt => {
      evt.preventDefault();

      const formData = new FormData(evt.target);
      const count = formData.get('count');
      const lists = !!formData.get('lists');
      const startWithLorem = !!formData.get('start-with-lorem');

      loremIpsumEl.setAttribute('count', count);
      loremIpsumEl.toggleAttribute('lists', lists);
      loremIpsumEl.toggleAttribute('start-with-lorem', startWithLorem);
      loremIpsumEl.generate();

      const codeEl = document.querySelector('#source-code');
      const sourceCodeTemplate = `<lorem-ipsum count="${count}"${lists ? ' lists' : ''}${startWithLorem ? ' start-with-lorem' : ''}></lorem-ipsum>`;
      codeEl.textContent = sourceCodeTemplate;
      window.hljs.highlightElement(codeEl);
    });
  })
  .catch(err => {
    console.error(err);
  });
