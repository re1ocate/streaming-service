import footerPlayer from "./footer-player/index";
import playlistList from "./playlist-list/index";
import playlistSidebar from "./playlist-sidebar/index";
import profileUser from "./profile-user/index";
import trackList from "./track-list/index";
import globalTemplate from "./global/index";
import Tracks from "./mock/index"
import {Track} from "./mock/index"
import './css/style.css';





// function renderComponent(container: HTMLElement | null, fragment: DocumentFragment): void {
//     container.appendChild(fragment);
// }

document.body.insertAdjacentHTML('afterbegin', globalTemplate.getTemplate());

async function init() {
    profileUser.renderComponent(document.getElementById('header'), profileUser.getElement());
    playlistSidebar.renderComponent(document.getElementById('aside'), playlistSidebar.getElement());
    trackList.renderComponent(document.getElementById('main'), trackList.getElement());
    Tracks.renderComponent(document.getElementById('trackList'), await Tracks.getElement()) // render mock 
    playlistList.renderComponent(document.getElementById('main'), playlistList.getElement());
    footerPlayer.renderComponent(document.getElementById('footer'), footerPlayer.getElement());
}
init().then(() =>{
    Tracks.addEventListener('click', (track: Track) => footerPlayer.play(track));
    footerPlayer.init();
    Tracks.fetchTracks().then(tracks => {
        footerPlayer.addTracks(tracks);
      });
});
