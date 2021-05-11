import { LitElement, html, css, property } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';

const fetchPOD = async () => {
  try {
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=y4M5p0atf7SnqbiSK914VHL3HpbhwXqkQhAfyYiC'
    );
    const data = await response.json();
    console.log('NASA APOD data', data);
    const image = new Image(100, 100);
    image.src = data.url;
    document.getElementById('container')?.appendChild(image);
    console.log(image);
  } catch (error) {
    console.log(error);
  }
};
const image = new Image(100, 100);
image.src = 'https://apod.nasa.gov/apod/image/2105/UluruOrion_Liu_1080.jpg';
document.getElementById('container')?.appendChild(image);
console.log(image);
export class MarsPhotoApi extends LitElement {
  @property({ type: String }) title = 'Mars photo api';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--mars-photo-api-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo > svg {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  response: Object;

  static get properties() {
    return {
      response: { type: Object },
    };
  }

  constructor() {
    super();
    this.response = [];
    fetchPOD();
  }

  async firstUpdated() {
    try {
      const response = await fetch(
        'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=y4M5p0atf7SnqbiSK914VHL3HpbhwXqkQhAfyYiC'
      );
      const data = await response.json();
      console.log('NASA MARS ROVER PHOTOS', data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return html`
      <main>
        <div>${openWcLogo}</div>
        <h1>${this.title}</h1>
        <div id="container"></div>

        <p>Edit <code>src/MarsPhotoApi.ts</code> and save to reload.</p>
        <a
          class="app-link"
          href="https://open-wc.org/guides/developing-components/code-examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code examples
        </a>
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}
