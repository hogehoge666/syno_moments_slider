import PhotoGW from './photo-gateway.js'
import PhotoList from './photo-list.js';
import PhotoTimer from './photo-timer.js';

(function () {

    const list = PhotoGW.getPhotos();
    const photos = new PhotoList(list);
    const timer = new PhotoTimer(() => {
        photos.next();
        showPhoto(photos.get());
    }, 3);

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('start').addEventListener('click', () => {
            startSlideshow();
        });

        document.getElementById('next').addEventListener('click', () => {
            showNextPhoto();
        }, false);

        document.getElementById('prev').addEventListener('click', () => {
            showPreviousPhoto();
        }, false);

        const btnPause = document.getElementById('pause');
        btnPause.addEventListener('click', () => {
            togglePauseAndPlay(btnPause);
        }, false);

    }, false);

    function startSlideshow() {
        showPhoto(photos.get());
        timer.start();
    }

    function showNextPhoto() {
        photos.next();
        showPhoto(photos.get());
        if (timer.isMoving) {
            timer.reset();
        }
    }

    function showPreviousPhoto() {
        photos.prev();
        showPhoto(photos.get());
        if (timer.isMoving) {
            timer.reset();
        }
    }

    function togglePauseAndPlay(btnPause) {
        if (timer.isMoving) {
            timer.stop();
            btnPause.innerHTML = 'Play';
        } else {
            photos.next();
            showPhoto(photos.get());
            timer.start();
            btnPause.innerHTML = '';
        }
    }

    function showPhoto(photo) {
        document.getElementById('photo').src = photo.url;
        document.getElementById('info').innerHTML = photo.date;
        console.log(photo);
    }

})();



