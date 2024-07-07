import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import sinon from 'sinon';
import { LoremIpsum } from '../src/lorem-ipsum.js';

LoremIpsum.defineCustomElement();

describe('lorem-ipsum', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  describe('accessibility', () => {
    it('passes accessibility test when enabled without attributes', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('attributes - properties', () => {
    // count
    it('reflects attribute "count" to property "count"', async () => {
      const el = await fixture(html`<lorem-ipsum count="5"></lorem-ipsum>`);
      expect(el.count).to.equal(5);
    });

    it('does not reflect property "count" to attribute "count"', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      el.count = 5;
      await elementUpdated(el);
      expect(el.getAttribute('count')).to.be.null;
    });

    it('"count" property defaults to 1 if attribute is not a number or invalid', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      el.setAttribute('count', 'NaN');
      expect(el.count).to.equal(1);
    });

    // lists
    it('reflects attribute "lists" to property "lists"', async () => {
      const el = await fixture(html`<lorem-ipsum lists></lorem-ipsum>`);
      expect(el.lists).to.be.true;
    });

    it('does not reflect property "lists" to attribute "lists"', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      el.lists = true;
      await elementUpdated(el);
      expect(el.hasAttribute('lists')).to.be.false;
    });

    // start-with-lorem
    it('reflects attribute "start-with-lorem" to property "startWithLorem"', async () => {
      const el = await fixture(html`<lorem-ipsum start-with-lorem></lorem-ipsum>`);
      expect(el.startWithLorem).to.be.true;
    });

    it('does not reflect property "startWithLorem" to attribute "start-with-lorem"', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      el.startWithLorem = true;
      await elementUpdated(el);
      expect(el.hasAttribute('start-with-lorem')).to.be.false;
    });
  });

  describe('methods', () => {
    it('"generate()" method is called', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      const generateSpy = sinon.spy(el, 'generate');
      el.generate();
      expect(generateSpy.called).to.be.true;
    });

    it('should generate new content when "generate()" is called', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      el.setAttribute('count', '2');
      el.setAttribute('lists', '');
      el.setAttribute('start-with-lorem', '');
      const oldContent = el.innerHTML;
      el.generate();
      expect(el.innerHTML).to.not.equal(oldContent);
    });
  });

  describe('basic functionality', () => {
    it('should generate 1 paragrpah by default', async () => {
      const el = await fixture(html`<lorem-ipsum></lorem-ipsum>`);
      expect(el.querySelectorAll('p')).to.have.lengthOf(1);
    });

    it('should generate 5 paragraphs when "count" is set to 5', async () => {
      const el = await fixture(html`<lorem-ipsum count="5"></lorem-ipsum>`);
      expect(el.querySelectorAll('p')).to.have.lengthOf(5);
    });

    it('should generate 1 list when "lists" is set and c"ount is not set', async () => {
      const el = await fixture(html`<lorem-ipsum lists></lorem-ipsum>`);
      expect(el.querySelectorAll('ul')).to.have.lengthOf(1);
    });

    it('should generate 5 lists when "lists" is set and "count" is set to 5', async () => {
      const el = await fixture(html`<lorem-ipsum lists count="5"></lorem-ipsum>`);
      expect(el.querySelectorAll('ul')).to.have.lengthOf(5);
    });

    it('should start with "Lorem ipsum..." when "startWithLorem" is set', async () => {
      const el = await fixture(html`<lorem-ipsum start-with-lorem></lorem-ipsum>`);
      expect(
        el
          .querySelector('p')
          .textContent.startsWith('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      ).to.be.true;
    });

    it('should start with "Lorem ipsum..." when "startWithLorem" is set and "lists" is set', async () => {
      const el = await fixture(html`<lorem-ipsum start-with-lorem lists></lorem-ipsum>`);
      expect(
        el
          .querySelector('ul > li')
          .textContent.startsWith('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
      ).to.be.true;
    });
  });
});
