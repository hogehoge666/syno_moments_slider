import MomentsPhotoGW from './moments/gateway.js';
import MomentsSliderView from './moments/slider-view.js';
import PhotoList from './photo-list.js';
import PhotoTimer from './timer.js';
import Slider from './slider.js';
import ENV from './env/env.json.js';
import MomentsPhotoListGetter from "./moments/photo-list-getter.js";
import HomeView from "./home-view.js";


(function () {
    let photoList = [];
    let slider = null;

    const gw = new MomentsPhotoGW(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, ENV.SYNO_USER, ENV.SYNO_PASSWORD);
    const homeView = new HomeView();
    const getter = new MomentsPhotoListGetter(gw, homeView)

    async function getPhotoListFromMoments() {
        const inputStartDate = document.getElementById('start-date').value;
        const inputEndDate = document.getElementById('end-date').value;
        return getter.getPhotoList(inputStartDate, inputEndDate);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('start-date').addEventListener('change', async () => {
            photoList = await getPhotoListFromMoments();
        });

        document.getElementById('end-date').addEventListener('change', async () => {
            photoList = await getPhotoListFromMoments();
        });

        document.getElementById('start').addEventListener('click', () => {
            const photos = new PhotoList(photoList);
            const interval = document.getElementById('interval').value;
            const timer = new PhotoTimer(() => {
                photos.next();
                sliderView.show(photos.get());
            }, interval);
            const sliderView = new MomentsSliderView(gw);
            slider = new Slider(photos, timer, sliderView);
            gw.login();
            slider.start();
        });

        document.getElementById('close').addEventListener('click', () => {
            slider.stop();
            gw.logout();
        });

        document.getElementById('next').addEventListener('click', () => {
            slider.next();
        }, false);

        document.getElementById('prev').addEventListener('click', () => {
            slider.prev();
        }, false);

        document.getElementById('pause').addEventListener('click', () => {
            slider.togglePauseAndPlay();
        }, false);
    }, false);

})();



