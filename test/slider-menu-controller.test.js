import SliderMenuController from "../static/slider-menu-controller";
import PhotoAlbum from '../static/photo-album';
import PhotoTimer from "../static/timer";
import DisplayPhotoCommands from "../static/display-photo-commands";
import DisplayPlayPauseMessage from "../static/display-play-pause-message";

jest.mock('../static/photo-album');
jest.mock('../static/timer');
jest.mock("../static/display-photo-commands");
jest.mock("../static/display-play-pause-message");
jest.mock('../static/slider-view');


describe('SliderMenuController', () => {
    let album = null;
    let timer = null;
    let displayPhoto = null;
    let displayPlayPauseMessage = null;
    let sliderController = null;
    beforeEach(() => {
        PhotoAlbum.mockClear();
        PhotoTimer.mockClear();
        DisplayPhotoCommands.mockClear();
        DisplayPlayPauseMessage.mockClear();
        album = new PhotoAlbum();
        timer = new PhotoTimer();
        displayPhoto = new DisplayPhotoCommands();
        displayPlayPauseMessage = new DisplayPlayPauseMessage();
        sliderController = new SliderMenuController(album, timer, displayPhoto, displayPlayPauseMessage);
    });

    describe('start', () => {
        it('should call DisplayPhotoCommands.do and Timer.start', () => {
            sliderController.start();
            expect(DisplayPhotoCommands.mock.instances[0].do).toBeCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].start).toHaveBeenCalledTimes(1);
        });
    });

    describe('stop', () => {
        it('should delete PlayPause message, reset album counter, and stop timer', () => {
            sliderController.stop();
            expect(DisplayPlayPauseMessage.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(DisplayPlayPauseMessage.mock.instances[0].do).toHaveBeenCalledWith('');
            expect(PhotoAlbum.mock.instances[0].reset).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].stop).toHaveBeenCalledTimes(1);
        });
    });

    describe('next', () => {
        it('should move to album to next photo, display the photo, and reset timer when timer is ticking', () => {
            timer.isMoving = true;
            sliderController.next();
            expect(PhotoAlbum.mock.instances[0].next).toHaveBeenCalledTimes(1);
            expect(DisplayPhotoCommands.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(1);
        });

        it('should move album to next photo, display the photo, and NOT reset timer when timer is not ticking', () => {
            timer.isMoving = false;
            sliderController.next();
            expect(PhotoAlbum.mock.instances[0].next).toHaveBeenCalledTimes(1);
            expect(DisplayPhotoCommands.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(0);
        });
    });

    describe('prev', () => {
        it('should move album to previous photo, display the photo, and reset timer when timer is ticking', () => {
            timer.isMoving = true;
            sliderController.prev();
            expect(PhotoAlbum.mock.instances[0].prev).toHaveBeenCalledTimes(1);
            expect(DisplayPhotoCommands.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(1);
        });

        it('should move album to previous photo, display the photo, and NOT reset timer when timer is not ticking', () => {
            timer.isMoving = false;
            sliderController.prev();
            expect(PhotoAlbum.mock.instances[0].prev).toHaveBeenCalledTimes(1);
            expect(DisplayPhotoCommands.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(0);
        });
    });

    describe('togglePauseAndPlay', () => {
        it('should stop timer and display Play message when timer is ticking', () => {
            timer.isMoving = true;
            sliderController.togglePlayAndPause();
            expect(PhotoTimer.mock.instances[0].stop).toHaveBeenCalledTimes(1);
            expect(DisplayPlayPauseMessage.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(DisplayPlayPauseMessage.mock.instances[0].do).toHaveBeenCalledWith('Play');
        });

        it('should move album to next photo, display the photo, start timer, and delete Play message when timer is not ticking', () => {
            timer.isMoving = false;
            sliderController.togglePlayAndPause();
            expect(PhotoAlbum.mock.instances[0].next).toHaveBeenCalledTimes(1);
            expect(DisplayPhotoCommands.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].start).toHaveBeenCalledTimes(1);
            expect(DisplayPlayPauseMessage.mock.instances[0].do).toHaveBeenCalledTimes(1);
            expect(DisplayPlayPauseMessage.mock.instances[0].do).toHaveBeenCalledWith('');
        });
    });

    describe('toggleInfo', () => {
        it('should call DisplayPhotoCommand.toggleInfo', () => {
            sliderController.toggleInfo();
            expect(DisplayPhotoCommands.mock.instances[0].toggleInfo).toHaveBeenCalledTimes(1);
        });
    });
});