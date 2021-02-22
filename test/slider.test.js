import Slider from "../static/slider";
import PhotoTimer from "../static/photo-timer";
import SimpleView from "../static/simple-photo/view";
import PhotoList from '../static/photo-list';

jest.mock('../static/photo-timer');
jest.mock('../static/simple-photo/view');
jest.mock('../static/photo-list');

describe('Slider', () => {
    let photos = null;
    let timer = null;
    let view = null;
    let slider = null;
    beforeEach(() => {
        PhotoTimer.mockClear();
        SimpleView.mockClear();
        PhotoList.mockClear();
        photos = new PhotoList();
        timer = new PhotoTimer();
        view = new SimpleView();
        slider = new Slider(photos, timer, view);
    });

    it('should be created with Photos, Timer, and View', () => {
        expect(slider.photos instanceof PhotoList).toBeTruthy();
        expect(slider.timer instanceof PhotoTimer).toBeTruthy();
        expect(slider.view instanceof SimpleView).toBeTruthy();
    });

    describe('start', () => {
        it('should tell View to show a photo and start Timer', () => {
            slider.start();
            expect(PhotoList.mock.instances[0].get).toHaveBeenCalledTimes(1);
            expect(SimpleView.mock.instances[0].show).toBeCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].start).toHaveBeenCalledTimes(1);
        });
    });

    describe('stop', () => {
        it('should delete Play message, reset photo counter, and stop timer', () => {
            const mockTogglePauseAndPlayMessage = jest.fn();
            slider.stop(mockTogglePauseAndPlayMessage);
            expect(mockTogglePauseAndPlayMessage).toHaveBeenCalledWith('');
            expect(PhotoList.mock.instances[0].reset).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].stop).toHaveBeenCalledTimes(1);
        });
    });

    describe('next', () => {
        it('should move to next photo, show it, and reset timer when timer is ticking', () => {
            timer.isMoving = true;
            slider.next();
            expect(PhotoList.mock.instances[0].next).toHaveBeenCalledTimes(1);
            expect(PhotoList.mock.instances[0].get).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(1);
        });

        it('should move to next photo, show, and NOT reset timer when timer is not ticking', () => {
            timer.isMoving = false;
            slider.next();
            expect(PhotoList.mock.instances[0].next).toHaveBeenCalledTimes(1);
            expect(PhotoList.mock.instances[0].get).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(0);
        });
    });

    describe('prev', () => {
        it('should move to previous photo, show it, and reset timer when timer is ticking', () => {
            timer.isMoving = true;
            slider.prev();
            expect(PhotoList.mock.instances[0].prev).toHaveBeenCalledTimes(1);
            expect(PhotoList.mock.instances[0].get).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(1);
        });

        it('should move to previous photo, shoow it, and NOT reset timer when timer is not ticking', () => {
            timer.isMoving = false;
            slider.prev();
            expect(PhotoList.mock.instances[0].prev).toHaveBeenCalledTimes(1);
            expect(PhotoList.mock.instances[0].get).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].reset).toHaveBeenCalledTimes(0);
        });
    });

    describe('togglePauseAndPlay', () => {
        it('should stop timer and display Play message when timer is ticking', () => {
            timer.isMoving = true;
            const mockTogglePauseAndPlayMessage = jest.fn();
            slider.togglePauseAndPlay(mockTogglePauseAndPlayMessage);
            expect(PhotoTimer.mock.instances[0].stop).toHaveBeenCalledTimes(1);
            expect(mockTogglePauseAndPlayMessage).toHaveBeenCalledWith('Play');
        });

        it('should move to next photo, shhow it, start timer, and delete Play message when timer is not ticking', () => {
            timer.isMoving = false;
            const mockTogglePauseAndPlayMessage = jest.fn();
            slider.togglePauseAndPlay(mockTogglePauseAndPlayMessage);
            expect(PhotoList.mock.instances[0].next).toHaveBeenCalledTimes(1);
            expect(PhotoList.mock.instances[0].get).toHaveBeenCalledTimes(1);
            expect(SimpleView.mock.instances[0].show).toHaveBeenCalledTimes(1);
            expect(PhotoTimer.mock.instances[0].start).toHaveBeenCalledTimes(1);
            expect(mockTogglePauseAndPlayMessage).toHaveBeenCalledWith('');
        });
    });
});