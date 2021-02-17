class PhotoList {
    constructor(_photoList) {
        this._photoList = _photoList;
        this._counter = 0;
        if (!_photoList) {
            this._counterMax = 0;
        } else {
            this._counterMax = _photoList.length;
        }
    }

    position() {
        return this._counter;
    }

    getCounterMax() {
        return this._counterMax;
    }

    next() {
        if (++this._counter === this._counterMax || this._counterMax === 0) {
            this._counter = 0;
        }
    }

    prev() {
        if (this._counterMax === 0) {
            this._counter = 0;
        } else if (--this._counter < 0) {
            this._counter = this._counterMax - 1;
        }
    }

    get() {
        if (this._counterMax === 0) {
            return '';
        }
        return this._photoList[this._counter];
    }
}

export default PhotoList;