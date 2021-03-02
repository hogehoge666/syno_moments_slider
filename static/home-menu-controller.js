import PhotoTimer from "./timer.js";
import SliderView from "./slider-view.js";
import DisplayDateCommand from "./display-date-command.js";
import DisplayImageCommand from "./display-image-command.js";
import DisplayPhotoCommands from "./display-photo-commands.js";
import DisplayPlayPauseMessage from "./display-play-pause-message.js";
import SliderMenuController from "./slider-menu-controller.js";
import PhotoGateway from "./photo-gateway.js";


class HomeMenuController {
    constructor(ajaxConnection) {
        this.photoGateway = new PhotoGateway(ajaxConnection);
        this.sliderMenuController = null;
    }

    startSlideshow(album, interval) {
        this.prepare(album, interval);
        this.photoGateway.connect();
        this.sliderMenuController.start();
    }

    // Todo: Need to decompose to make it more testable.
    //       Callback is not covered.
    prepare(album, interval) {
        const timer = new PhotoTimer(() => {
            album.next();
            displayPhoto.do();
        }, interval);
        const sliderView = new SliderView();
        const displayImage = new DisplayImageCommand(sliderView, this.photoGateway);
        const displayDate = new DisplayDateCommand(sliderView);
        const infoCommandsList = [[displayDate], []];
        const displayPhoto = new DisplayPhotoCommands(album, displayImage, infoCommandsList);
        const displayPlayPauseMessage = new DisplayPlayPauseMessage(sliderView);
        this.sliderMenuController = new SliderMenuController(album, timer, displayPhoto, displayPlayPauseMessage);
    }

    endSlideshow() {
        this.sliderMenuController.stop();
        this.photoGateway.disconnect();
    }

    getSliderController() {
        return this.sliderMenuController;
    }
}

export default HomeMenuController;