import { AbstractComponent } from '../abstract';
import { createElement } from '../utils/index'
import axios from 'axios';
interface Artist {
    name: string
}
interface Album {
    name: string
}
export interface Track {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  duration: number;
  createdAt: string;
  album: Album;
  artist: Artist;
}
class Tracks extends AbstractComponent {
  private static fragment: DocumentFragment;
  private static tracks: Track[];


  static getTemplate(): string {
    if (!this.tracks) {
      return '';
    }
    return this.tracks.map(track => `
      <li class="tracks__item flex">
                  <div class="tracks__item__number">${track.id}</div>
                  <div class="tracks__item__name"><img class="track__img" src="${track.image}" alt="In Bloom">
                    <div class="track__content">
                      <h3 class="track__name"><a class="track__name__link" href="#">${track.name}</a></h3><span class="track__author">${track.artist.name}</span>
                    </div>
                  </div>
                  <div class="tracks__item__albom">${track.album.name}</div>
                  <div class="tracks__item__data flex"><span class="data__text">${this.getDaysAgo(track.createdAt)}</span>
                    <button class="track__like-btn like-btn--active"><svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z" fill="#FC6D3E"/>
  </svg>
                    </button>
                  </div>
                  <time class="tracks__item__time">${this.getMinutes(track.duration)}</time>
                  <div class="tracks__item__drop">
                    <button class="track__btn-dropdown"><svg width="23" height="4" viewBox="0 0 23 4" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="2" cy="2" r="2" fill="#C4C4C4"/>
  <circle cx="11.5" cy="2" r="2" fill="#C4C4C4"/>
  <circle cx="21" cy="2" r="2" fill="#C4C4C4"/>
  </svg>
                    </button>
                    <div class="track__dropdown">
                      <button class="track__add-btn">Добавить в плейлист</button>
                      <button class="track__delete-btn">Удалить из плейлиста</button>
                    </div>
                  </div>
                </li>
      `).join('');

  }
  static getMinutes(milSec: number): string{
    const minutes = Math.floor(milSec / 60000);
    const seconds = Math.floor((milSec % 60000) / 1000);
    return (`${minutes.toString()}:${seconds.toString().padStart(2, '0')}`)
  }
  static getDaysAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'день' : 'дня'} назад`;
  }

  static async getElement(): Promise<DocumentFragment> 
  {
    if (!this.tracks) {
      this.tracks = await this.fetchTracks();
    }
    this.fragment ??= createElement(this.getTemplate());
    return this.fragment;
}

static addEventListener(event: string, callback: (track: Track) => void) {
  Array.from(this.element).forEach((element) => {
    element.addEventListener(event,(event) =>{
      const target = event.target;
      if (target instanceof HTMLElement) {
        const track = this.tracks.find((track) => track.name === target.textContent);;
        if (track) {
          callback(track)
        }
      }
    })
  })
}


  static removeElement(): void {
      this.element = null;
  }
  static async fetchTracks(): Promise<Track[]> {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpZCI6MSwiaWF0IjoxNzI5NzQwMDY1LCJleHAiOjE3MzAzNDQ4NjV9.9z3lBod5ZUyZ-dmDATPwfhMElACtwvFCvmFVKJJzjPY';
        const response = await axios.get('http://localhost:3000/api/songs', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
}    

export default Tracks;