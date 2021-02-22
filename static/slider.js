class Slider {
    constructor(photos, timer, view) {
        this.photos = photos;
        this.timer = timer;
        this.view = view;
    }

    start() {
        this.view.show(this.photos.get());
        this.timer.start();
    }

    stop(togglePauseAndPlayMessage) {
        togglePauseAndPlayMessage('');
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

    togglePauseAndPlay(togglePauseAndPlayMessage) {
        if (this.timer.isMoving) {
            this.timer.stop();
            togglePauseAndPlayMessage('Play');
        } else {
            this.photos.next();
            this.view.show(this.photos.get());
            this.timer.start();
            togglePauseAndPlayMessage('');
        }
    }
}

export default Slider;