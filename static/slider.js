class Slider {
    constructor(photos, timer, sliderView) {
        this.photos = photos;
        this.timer = timer;
        this.view = sliderView;
    }

    start() {
        this.view.show(this.photos.get());
        this.timer.start();
    }

    stop() {
        this.view.setPauseAndPlayMessage('');
        this.photos.reset();
        this.timer.stop();
    }

    next() {
        this.photos.next();
        this.view.show(this.photos.get());
        if (this.timer.isMoving) {
            this.timer.reset();
        }
    }

    prev() {
        this.photos.prev();
        this.view.show(this.photos.get());
        if (this.timer.isMoving) {
            this.timer.reset();
        }
    }

    togglePauseAndPlay() {
        if (this.timer.isMoving) {
            this.timer.stop();
            this.view.setPauseAndPlayMessage('Play');
        } else {
            this.photos.next();
            this.view.show(this.photos.get());
            this.timer.start();
            this.view.setPauseAndPlayMessage('');
        }
    }
}

export default Slider;