import { LitElement, html, css, property } from 'lit-element';

const fetchPOD = async () => {
  try {
    const response = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=y4M5p0atf7SnqbiSK914VHL3HpbhwXqkQhAfyYiC'
    );
    const data = await response.json();
    const photoMPA = document.querySelector('mars-photo-api');
    if (photoMPA && photoMPA.shadowRoot) {
      const shadow = photoMPA.shadowRoot.getElementById('quote');
      if (shadow) {
        console.log(shadow);
        shadow.style.backgroundImage = `url(${data.url})`;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export class MarsPhotoApi extends LitElement {
  @property({ type: String }) title = 'Mars photo api';

  static styles = css`
    header {
      display: flex;
      padding: 20px;
      color: black;
      background-color: rgba(248, 248, 248, 255);
      font-family: 'Times New Romans', serif;
      text-transform: uppercase;
    }
    #quote {
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .quote {
      color: white;
      font-size: 40px;
      font-family: 'Brush Script MT', Brush Script Std, cursive;
    }
    .credit {
      color: white;
      font-size: 20px;
      font-family: 'URW Chancery L', serif;
    }
  `;

  response: Object;

  roverName = 'curiosity';

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
      const rover: HTMLSelectElement = document.getElementById(
        'Rover'
      ) as HTMLSelectElement;
      // const roverValue = rover.value;
      console.log(rover);
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.roverName}/photos?sol=1000&page=2&api_key=y4M5p0atf7SnqbiSK914VHL3HpbhwXqkQhAfyYiC`
      );
      const data = await response.json();
      console.log('NASA MARS ROVER PHOTOS', data);
      for (const photo of data.photos) {
        const image = new Image(600, 500);
        image.src = photo.img_src;
        document.body.appendChild(image);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update_rover_name(){
  //   const select = document.getElementById('Rover') as HTMLSelectElement;
  //   console.log(select);
  //   this.roverName = select.value;
  //   console.log(this.roverName);
  //   console.log('it ran');
  // }
  render() {
    return html`
       <main>
        <header>
          <img src="src/MarsLogo.jpg" alt="logo" width="100" height="100"></img>
          <h1 class = "title">Mars Rover Photos</h1>
        </header>
          <div id="quote">
            <div>
              <p class="quote"> " My battery is low and it's getting dark."</p>
              <p class="credit"> - Journalist, Jacob Margolis, translation of Opportunity rover last transmission on June 10, 2018.</p>
            </div>
          </div>
            <select id="Rover" @blur="put function here">
              <option value="opportunity">Opportunity
              <option value="spirit">Spirit
              <option value="curiosity" selected>Curiosity
            </select>
       </main>`;
  }
}
