import { expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
// import sinon from 'sinon';
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
});
