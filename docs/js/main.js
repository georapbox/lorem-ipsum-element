import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/lorem-ipsum.js' : '../lib/lorem-ipsum.js';

const renderSourceCode = (count, lists, startWithLorem) => {
  const codeEl = document.getElementById('source-code');
  const countAttr = count ? ` count="${count}"` : '';
  const template = `<lorem-ipsum${countAttr}${lists ? ' lists' : ''}${startWithLorem ? ' start-with-lorem' : ''}></lorem-ipsum>`;

  codeEl.textContent = template;
  window.hljs.highlightElement(codeEl);
};

const loremIpsumEl = document.querySelector('lorem-ipsum');
const formEl = document.querySelector('form');

const count = loremIpsumEl.getAttribute('count') || '';
const lists = loremIpsumEl.hasAttribute('lists');
const startWithLorem = loremIpsumEl.hasAttribute('start-with-lorem');

document.body.classList.remove('no-js');

try {
  const { LoremIpsum } = await import(componentUrl);
  LoremIpsum.defineCustomElement();
  formEl.querySelector('input[type="submit"]').disabled = false;
} catch (err) {
  console.error(err);
}

formEl.querySelector('#count').value = count;
formEl.querySelector('#lists').checked = lists;
formEl.querySelector('#start-with-lorem').checked = startWithLorem;

renderSourceCode(count, lists, startWithLorem);

formEl.addEventListener('submit', async evt => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const count = formData.get('count');
  const lists = !!formData.get('lists');
  const startWithLorem = !!formData.get('start-with-lorem');

  loremIpsumEl.setAttribute('count', count);
  loremIpsumEl.toggleAttribute('lists', lists);
  loremIpsumEl.toggleAttribute('start-with-lorem', startWithLorem);
  loremIpsumEl.generate();

  renderSourceCode(count, lists, startWithLorem);
});
