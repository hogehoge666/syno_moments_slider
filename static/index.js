// import SimplePhotoGW from './simple-photo/gateway.js'
// import SimpleView from './simple-photo/view.js';
import MomentsPhotoGW from './moments/gateway.js';
import MomentsView from './moments/view.js';
import PhotoList from './photo-list.js';
import PhotoTimer from './photo-timer.js';
import Slider from './slider.js';
import ENV from './env.json.js';


(function () {

    // const gw = new SimplePhotoGW();
    const gw = new MomentsPhotoGW(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, ENV.SYNO_USER, ENV.SYNO_PASSWORD);
    const list = gw.getPhotos();

    const photos = new PhotoList(list);

    const timer = new PhotoTimer(() => {
        photos.next();
        view.show(photos.get());
    }, 3);

    // const view = new SimpleView();
    const view = new MomentsView(gw);

    const slider = new Slider(photos, timer, view);

    let btnPause = null;
    const togglePauseAndPlayMessage = (message) => {
        btnPause.innerHTML = message;
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('start').addEventListener('click', () => {
            gw.login();
            slider.start();
        });

        document.getElementById('stop').addEventListener('click', () => {
            slider.stop(togglePauseAndPlayMessage);
            gw.logout();
        });

        document.getElementById('next').addEventListener('click', () => {
            slider.next();
        }, false);

        document.getElementById('prev').addEventListener('click', () => {
            slider.prev();
        }, false);

        btnPause = document.getElementById('pause');
        btnPause.addEventListener('click', () => {
            slider.togglePauseAndPlay(togglePauseAndPlayMessage);
        }, false);
    }, false);

})();



