// @ts-check

import { phrases } from './constants/phrases.js';
import { shuffle } from './utils/shuffle.js';
import { randomInt } from './utils/randomInt.js';

const COMPONENT_NAME = 'lorem-ipsum';

/**
 * @summary A custom element that generates "Lorem Ipsum" placeholder text.
 * @documentation https://github.com/georapbox/lorem-ipsum-element
 *
 * @tagname lorem-ipsum - This is the default tag name, unless overridden by the `defineCustomElement` method.
 * @extends HTMLElement
 *
 * @property {number} count - The number of paragraphs or lists to generate.
 * @property {boolean} lists - Wheter to generate lists instead of paragraphs.
 * @property {boolean} startWithLorem - Whether the first paragraph should start with "Lorem ipsum dolor sit amet...".
 *
 * @attribute {number} count - The number of paragraphs or lists to generate.
 * @attribute {string} lists - Whether to generate lists instead of paragraphs.
 * @attribute {boolean} start-with-lorem - Whether the first paragraph should start with "Lorem ipsum dolor sit amet...".
 */
class LoremIpsum extends HTMLElement {
  #count = 1;
  #lists = false;
  #startWithLorem = false;
  #resolveUpdateComplete = () => {};

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['count', 'lists', 'start-with-lorem'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count' && oldValue !== newValue) {
      this.#count = Number(newValue);
    }

    if (name === 'lists' && oldValue !== newValue) {
      this.#lists = this.hasAttribute('lists');
    }

    if (name === 'start-with-lorem' && oldValue !== newValue) {
      this.#startWithLorem = this.hasAttribute('start-with-lorem');
    }
  }

  /**
   * Lifecycle method that is called when the element is added to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('count');
    this.#upgradeProperty('lists');
    this.#upgradeProperty('startWithLorem');
    this.#render();
  }

  /**
   * @type {number} - The number of paragraphs or lists to generate.
   * @default 1
   * @attribute count
   */
  get count() {
    return Math.abs(Math.floor(Number(this.#count))) || 1;
  }

  set count(value) {
    this.#count = Number(value);
  }

  /**
   * @type {boolean} - Wheter to generate lists instead of paragraphs.
   * @default false
   * @attribute lists
   */
  get lists() {
    return !!this.#lists;
  }

  set lists(value) {
    this.#lists = value;
  }

  /**
   * @type {boolean} - Whether the first paragraph should start with "Lorem ipsum dolor sit amet...".
   * @default false
   * @attribute start-with-lorem
   */
  get startWithLorem() {
    return !!this.#startWithLorem;
  }

  set startWithLorem(value) {
    this.#startWithLorem = value;
  }

  /**
   * Generates the lorem ipsum text.
   */
  async #render() {
    this.textContent = '';

    const YIELD_EVERY_N_ITERATIONS = 100;
    let element = null;

    for (let i = 0; i < this.count; i++) {
      const numberOfItems = randomInt(3, 7);
      const shuffledPhrases = shuffle(phrases);
      const selectedPhrases = shuffledPhrases.slice(0, numberOfItems);

      // Ensure the list starts with the 'Lorem ipsum...' phrase
      // if the option is set and it's the first iteration.
      if (this.startWithLorem && i === 0) {
        const loremIpsumPhrase = phrases[0];
        const includesLoremIpsum = selectedPhrases.includes(loremIpsumPhrase);

        if (includesLoremIpsum) {
          selectedPhrases.splice(selectedPhrases.indexOf(loremIpsumPhrase), 1);
          selectedPhrases.unshift(loremIpsumPhrase);
        } else {
          selectedPhrases[0] = loremIpsumPhrase;
        }
      }

      if (this.lists) {
        element = document.createElement('ul');

        for (let j = 0; j < numberOfItems; j++) {
          const li = document.createElement('li');
          li.textContent = selectedPhrases[j];
          element.appendChild(li);
        }
      } else {
        element = document.createElement('p');
        element.textContent = selectedPhrases.join(' ');
      }

      this.appendChild(element);

      if (i % YIELD_EVERY_N_ITERATIONS === 0) {
        // Yield control back to the main thread every N iterations
        await new Promise(requestAnimationFrame);
      }
    }

    this.#resolveUpdateComplete();
  }

  /**
   * Generates the lorem ipsum text.
   *
   * @returns {Promise<void>} - A promise that resolves when the text is generated.
   */
  async generate() {
    await this.#render();
  }

  /**
   * A promise that resolves when the element has completed updating.
   *
   * @type {Promise<void>}
   */
  updateComplete = new Promise(resolve => {
    this.#resolveUpdateComplete = resolve;
  });

  /**
   * This is to safe guard against cases where, for instance, a framework may have added the element to the page and set a
   * value on one of its properties, but lazy loaded its definition. Without this guard, the upgraded element would miss that
   * property and the instance property would prevent the class property setter from ever being called.
   *
   * https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
   *
   * @param {'count' | 'lists' | 'startWithLorem'} prop - The property name to upgrade.
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
