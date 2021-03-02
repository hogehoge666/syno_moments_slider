import FetchAjaxConnection from "./fetch-ajax-connection.js";
import DateRangePhotoListGateway from './date-range-photo-list-gateway.js';
import DateRangeSelectMenuController from "./date-range-select-menu-controller.js";
import HomeMenuView from "./home-menu-view.js";
import DateRangeSelectMenuView from "./date-range-select-menu-view.js";
import PhotoAlbum from './photo-album.js';
import ENV from './env/env.json.js';
import HomeMenuController from "./home-menu-controller.js";


(function () {

    let album = null;

    let homeMenuController = null;
    let sliderMenuController = null;

    const homeMenuView = new HomeMenuView();
    const dateRangeSelectMenuView = new DateRangeSelectMenuView();
    const ajaxConnection = new FetchAjaxConnection(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, ENV.SYNO_USER, ENV.SYNO_PASSWORD);
    const dateRangePhotoListGateway = new DateRangePhotoListGateway(ajaxConnection);
    const dateRangeSelectMenuController = new DateRangeSelectMenuController(homeMenuView, dateRangeSelectMenuView, dateRangePhotoListGateway);

    async function pullPhotoListFromMoments() {
        const inputStartDate = document.getElementById('start-date').value;
        const inputEndDate = document.getElementById('end-date').value;
        const photoList = await dateRangeSelectMenuController.getPhotoList(inputStartDate, inputEndDate);
        album = new PhotoAlbum(photoList);
    }

    document.addEventListener('DOMContentLoaded', () => {
        // listeners for Date Range Select Menu
        document.getElementById('start-date').addEventListener('change', () => {
            pullPhotoListFromMoments();
        });

        document.getElementById('end-date').addEventListener('change', () => {
            pullPhotoListFromMoments();
        });

        // listeners for Home menu
        document.getElementById('start').addEventListener('click', () => {
            homeMenuController = new HomeMenuController(ajaxConnection);
            const interval = document.getElementById('interval').value;
            homeMenuController.startSlideshow(album, interval);
            sliderMenuController = homeMenuController.getSliderController();
        });

        // listeners for slideshow buttons
        document.getElementById('close').addEventListener('click', () => {
            homeMenuController.endSlideshow();
            homeMenuController = null;
            sliderMenuController = null;
        });

        document.getElementById('next').addEventListener('click', () => {
            sliderMenuController.next();
        }, false);

        document.getElementById('prev').addEventListener('click', () => {
            sliderMenuController.prev();
        }, false);

        document.getElementById('pause').addEventListener('click', () => {
            sliderMenuController.togglePlayAndPause();
        }, false);

        document.getElementById('info-toggle').addEventListener('click', () => {
            sliderMenuController.toggleInfo();
        }, false);
    }, false);

})();



