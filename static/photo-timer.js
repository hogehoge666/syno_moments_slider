class PhotoTimer {
    constructor(_callback, _intervalSec) {
        this._callback = _callback;
        this._intervalMsec = _intervalSec * 1000;
        this._timerId = 0;
        this.isMoving = false;
    }

    start() {
        if (this.isMoving) {
            return;
        }
        this._timerId = setInterval(this._callback, this._intervalMsec);
        this.isMoving = true;
    }

    stop() {
        clearInterval(this._timerId);
        this.isMoving = false;
    }

    reset() {
        this.stop()
        this.start();
    }

}

export default PhotoTimer;