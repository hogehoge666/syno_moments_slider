class SliderMenuController {
    constructor(album, timer, displayPhoto, displayPlayPauseMessage) {
        this.album = album;
        this.timer = timer;
        this.displayPhoto = displayPhoto;
        this.displayPlayPauseMessage = displayPlayPauseMessage;
    }

    start() {
        this.displayPhoto.do();
        this.timer.start();
    }

    stop() {
        this.displayPlayPauseMessage.do('');
        this.album.reset();
        this.timer.stop();
    }

    next() {
        this.album.next();
        this.displayPhoto.do();
        if (this.timer.isMoving) {
            this.timer.reset();
        }
    }

    prev() {
        this.album.prev();
        this.displayPhoto.do();
        if (this.timer.isMoving) {
            this.timer.reset();
        }
    }

    togglePlayAndPause() {
        if (this.timer.isMoving) {
            this.timer.stop();
            this.displayPlayPauseMessage.do('Play');
        } else {
            this.album.next();
            this.displayPhoto.do();
            this.timer.start();
            this.displayPlayPauseMessage.do('');
        }
    }
}

export default SliderMenuController;