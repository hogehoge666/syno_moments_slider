import SimplePhotoGW from './simple-photo/gateway.js'
import PhotoList from './photo-list.js';
import PhotoTimer from './photo-timer.js';
import Slider from './slider.js';
import SimpleView from './simple-photo/view.js';


(function () {

    const list = SimplePhotoGW.getPhotos();
    const photos = new PhotoList(list);
    const timer = new PhotoTimer(() => {
        photos.next();
        view.show(photos.get());
    }, 3);
    const view = new SimpleView();
    const slider = new Slider(photos, timer, view);

    let btnPause = null;
    const togglePauseAndPlayMessage = (message) => {
        btnPause.innerHTML = message;
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('start').addEventListener('click', () => {
            slider.start();
        });

        document.getElementById('stop').addEventListener('click', () => {  
            slider.stop(togglePauseAndPlayMessage);
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



