import HomeMenuController from "../static/home-menu-controller";
import PhotoAlbum from "../static/photo-album";
import SliderMenuController from "../static/slider-menu-controller.js";
import PhotoGateway from "../static/photo-gateway.js";

jest.mock("../static/photo-album");
jest.mock("../static/slider-menu-controller.js");
jest.mock("../static/photo-gateway.js");

describe('HomeMenuController', () => {
    let homeMenuController = null;
    let album = null;
    beforeEach(() => {
        homeMenuController = new HomeMenuController();
        album = new PhotoAlbum();
        homeMenuController.photoGateway = new PhotoGateway();
        homeMenuController.sliderMenuController = new SliderMenuController();
    });

    describe('startSlideshow', () => {
        it('should call PhotoGateway.connect and SliderMenuController.start', () => {
            homeMenuController.startSlideshow(album, 3);
            expect(homeMenuController.photoGateway.connect).toHaveBeenCalledTimes(1);
            expect(homeMenuController.sliderMenuController.start).toHaveBeenCalledTimes(1);
        });
    });

    describe('endSlideshow', () => {
        it('should SliderMenuController.stop and PhotoGateway.disconnect', () => {
            homeMenuController.endSlideshow(album, 3);
            expect(homeMenuController.sliderMenuController.stop).toHaveBeenCalledTimes(1);
            expect(homeMenuController.photoGateway.disconnect).toHaveBeenCalledTimes(1);
        });
    });

    describe('getSliderController', () => {
        it('should return a sliderMenuController after slideshow started', () => {
            homeMenuController.sliderMenuController = null;
            homeMenuController.startSlideshow(album, 3);
            const obj = homeMenuController.getSliderController();
            expect(obj instanceof SliderMenuController).toBeTruthy();
        });
    });
});