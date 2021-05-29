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
  
  

  async Updated(rover: string, camera: string, sol: string) {
    try {
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=y4M5p0atf7SnqbiSK914VHL3HpbhwXqkQhAfyYiC`);
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
  
  updateImage(){
    const marsSelect = document.querySelector('mars-photo-api') as HTMLElement;
    const selectRover = marsSelect.shadowRoot?.getElementById('Rover') as HTMLSelectElement;
    const rover = selectRover.value;
    const selectCamera = marsSelect.shadowRoot?.getElementById('Camera') as HTMLSelectElement;
    const camera = selectCamera.value;
    const selectSol = marsSelect.shadowRoot?.getElementById('Sol') as HTMLSelectElement;
    const sol = selectSol.value;
    this.Updated(rover,camera,sol);
  }

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
          <div id="userInputs">  
            <select id="Rover" @change=${this.updateImage}>
              <option value="opportunity">Opportunity
              <option value="spirit">Spirit
              <option value="curiosity" selected>Curiosity
            </select>
            <select id="Camera" @change=${this.updateImage}>
              <option value="fhaz">FHAZ
              <option value="rhaz">RHAZ
              <option value="mast">MAST
              <option value="CHEMCAM">CHEMCAM
              <option value="MAHLI">MAHLI
              <option value="MARDI">MARDI
              <option value="NAVCAM" selected>NAVCAM
              <option value="PANCAM">PANCAM
              <option value="MINITES">MINITES
            </select>
            <select id="Sol" @change=${this.updateImage}>
              <option value="100">100
              <option value="200">200
              <option value="300">300
              <option value="400">400
              <option value="500">500
              <option value="600">600
              <option value="700">700
              <option value="800">800
              <option value="900">900
              <option value="1000"selected>1000
            </select>
          </div>

       </main>`;
  }
}
