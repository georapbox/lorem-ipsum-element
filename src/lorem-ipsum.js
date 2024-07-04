// @ts-check

import { shuffle } from './utils/shuffle.js';

const COMPONENT_NAME = 'lorem-ipsum';

/**
 * @summary A custom element that generates lorem ipsum text.
 * @documentation https://github.com/georapbox/lorem-ipsum-element
 *
 * @tagname lorem-ipsum - This is the default tag name, unless overridden by the `defineCustomElement` method.
 * @extends HTMLElement
 *
 * @property {string} type - The type of content to generate. Either "paragraphs" or "lists".
 * @property {number} items - The number of paragraphs or lists to generate.
 * @property {boolean} startWithLorem - Whether the first paragraph should start with "Lorem ipsum dolor sit amet...".
 *
 * @attribute {string} type - Reflects the type property.
 * @attribute {number} items - Reflects the items property.
 * @attribute {boolean} start-with-lorem - Reflects the startWithLorem property.
 */
class LoremIpsum extends HTMLElement {
  #loremIpsumPhrases = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.',
    'Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
    'Integer in mauris eu nibh euismod gravida.',
    'Duis ac tellus et risus vulputate vehicula.',
    'Donec lobortis risus a elit. Etiam tempor.',
    'Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.',
    'Maecenas fermentum consequat mi. Donec fermentum.',
    'Pellentesque malesuada nulla a mi.',
    'Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.',
    'Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.',
    'Cras mollis scelerisque nunc. Nullam arcu.',
    'Aliquam erat volutpat. Duis ac turpis.',
    'Integer rutrum ante eu lacus.',
    'Vestibulum libero nisl, porta vel, scelerisque eget, malesuada at, neque.',
    'Vivamus eget nibh. Etiam cursus leo vel metus.',
    'Nulla facilisi. Aenean nec eros.',
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sollicitudin velit sed leo.',
    'Ut pharetra augue nec augue.',
    'Nam elit agna, endrerit sit amet, tincidunt ac, viverra sed, nulla.',
    'Donec porta diam eu massa.',
    'Quisque diam lorem, interdum vitae, dapibus ac, scelerisque vitae, pede.',
    'Donec eget tellus non erat lacinia fermentum.',
    'Donec in velit vel ipsum auctor pulvinar.',
    'Vestibulum iaculis lacinia est.',
    'Proin dictum elementum velit.',
    'Fusce euismod consequat ante.',
    'Pellentesque sed dolor. Aliquam congue fermentum nisl.',
    'Mauris accumsan nulla vel diam.',
    'Sed in lacus ut enim adipiscing aliquet.',
    'Nulla venenatis. In pede mi, aliquet sit amet, euismod in, auctor ut, ligula.',
    'Aliquam dapibus tincidunt metus.',
    'Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem.',
    'Vestibulum sed ante. Donec sagittis euismod purus.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.'
  ];

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['type', 'items', 'start-with-lorem'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type' && oldValue !== newValue) {
      console.log('type changed', this.type);
      this.#render();
    }

    if (name === 'items' && oldValue !== newValue) {
      console.log('type changed', this.items);
      this.#render();
    }

    if (name === 'start-with-lorem' && oldValue !== newValue) {
      console.log('type changed', this.startWithLorem);
      this.#render();
    }
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('type');
    this.#upgradeProperty('items');
    this.#upgradeProperty('startWithLorem');
    console.log('connected');
    this.#render();
  }

  /**
   * @type {string} - The type of content to generate. Either "paragraphs" or "lists".
   * @default 'paragraphs'
   * @attribute type - Reflects the type property.
   */
  get type() {
    return this.getAttribute('type') || 'paragraphs';
  }

  set type(value) {
    this.setAttribute('type', value);
  }

  /**
   * @type {number} - The number of paragraphs or lists to generate.
   * @default 1
   * @attribute items - Reflects the items property.
   */
  get items() {
    return Math.abs(Math.floor(Number(this.getAttribute('items')))) || 1;
  }

  set items(value) {
    if (value == null) {
      this.removeAttribute('items');
      return;
    }

    this.setAttribute('items', (Math.abs(Math.floor(value)) || '1').toString());
  }

  /**
   * @type {boolean} - Whether the first paragraph should start with "Lorem ipsum dolor sit amet...".
   * @default false
   * @attribute start-with-lorem - Reflects the startWithLorem property.
   */
  get startWithLorem() {
    return this.hasAttribute('start-with-lorem');
  }

  set startWithLorem(value) {
    this.toggleAttribute('start-with-lorem', !!value);
  }

  /**
   * Generates a paragraph with a random number of sentences.
   *
   * @param {string[]} phrases - The phrases to generate the random text from.
   * @param {number} numberOfSentences - The number of sentences to generate.
   * @param {boolean} isFirstParagraph - Whether the paragraph is the first one.
   * @returns {string} - The generated paragraph.
   */
  #generateParagraph(phrases, numberOfSentences, isFirstParagraph) {
    const shuffledPhrases = shuffle(phrases);
    const selectedPhrases = shuffledPhrases.slice(0, numberOfSentences);

    // Ensure the first paragraph always starts with the first phrase.
    if (isFirstParagraph && this.startWithLorem) {
      const loremIpsumPhrase = phrases[0];
      const includesLoremIpsum = selectedPhrases.includes(loremIpsumPhrase);

      if (includesLoremIpsum) {
        selectedPhrases.splice(selectedPhrases.indexOf(loremIpsumPhrase), 1);
        selectedPhrases.unshift(loremIpsumPhrase);
      } else {
        selectedPhrases[0] = loremIpsumPhrase;
      }
    }

    return selectedPhrases.join(' ');
  }

  /**
   * Generates a list with a random number of items.
   *
   * @param {string[]} phrases - The phrases to generate the random text from.
   * @param {*} numberOfItems - The number of items to generate.
   * @param {*} isfirstList - Whether the list is the first one.
   * @returns {string[]} - The generated list.
   */
  #generateList(phrases, numberOfItems, isfirstList) {
    const shuffledPhrases = shuffle(phrases);
    const selectedPhrases = shuffledPhrases.slice(0, numberOfItems);

    // Ensure the first list always starts with the first phrase.
    if (isfirstList && this.startWithLorem) {
      const loremIpsumPhrase = phrases[0];
      const includesLoremIpsum = selectedPhrases.includes(loremIpsumPhrase);

      if (includesLoremIpsum) {
        selectedPhrases.splice(selectedPhrases.indexOf(loremIpsumPhrase), 1);
        selectedPhrases.unshift(loremIpsumPhrase);
      } else {
        selectedPhrases[0] = loremIpsumPhrase;
      }
    }

    return selectedPhrases;
  }

  /**
   * Generates the lorem ipsum text.
   *
   * @param {string[]} phrases - The phrases to generate the random text from.
   */
  #generateLoremIpsum(phrases) {
    this.textContent = '';

    if (this.type === 'lists') {
      for (let i = 0; i < this.items; i++) {
        const ul = document.createElement('ul');
        const numberOfItems = Math.floor(Math.random() * 5) + 3; // Random number of items between 3 and 7.
        const list = this.#generateList(phrases, numberOfItems, i === 0);

        for (let j = 0; j < numberOfItems; j++) {
          const li = document.createElement('li');
          li.textContent = list[j];
          ul.appendChild(li);
        }

        this.appendChild(ul);
      }
    } else {
      for (let i = 0; i < this.items; i++) {
        const numberOfSentences = Math.floor(Math.random() * 5) + 3; // Random number of sentences between 3 and 7.
        const paragraph = this.#generateParagraph(phrases, numberOfSentences, i === 0);

        const p = document.createElement('p');
        p.textContent = paragraph;
        this.appendChild(p);
      }
    }
  }

  #render() {
    console.log('render');
    this.#generateLoremIpsum(this.#loremIpsumPhrases);
  }

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {string} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    /** @type {any} */
    const instance = this;

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines a custom element with the given name.
   * The name must contain a dash (-).
   *
   * @param {string} [elementName='lorem-ipsum'] - The name of the custom element.
   */
  static defineCustomElement(elementName = COMPONENT_NAME) {
    if (typeof window !== 'undefined' && !window.customElements.get(elementName)) {
      window.customElements.define(elementName, LoremIpsum);
    }
  }
}

export { LoremIpsum };
