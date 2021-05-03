import { html, fixture, expect } from '@open-wc/testing';

import { MarsPhotoApi } from '../src/MarsPhotoApi.js';
import '../src/mars-photo-api.js';

describe('MarsPhotoApi', () => {
  let element: MarsPhotoApi;
  beforeEach(async () => {
    element = await fixture(html`<mars-photo-api></mars-photo-api>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
