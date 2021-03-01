class PhotoAlbum {
    constructor(_photoList) {
        this._photoList = _photoList;
        this._counter = 0;
        if (!_photoList) {
            this._size = 0;
        } else {
            this._size = _photoList.length;
        }
    }

    position() {
        return this._counter;
    }

    getSize() {
        return this._size;
    }

    next() {
        if (++this._counter === this._size || this._size === 0) {
            this._counter = 0;
        }
    }

    prev() {
        if (this._size === 0) {
            this._counter = 0;
        } else if (--this._counter < 0) {
            this._counter = this._size - 1;
        }
    }

    reset() {
        this._counter = 0;
    }

    get() {
        if (this._size === 0) {
            return '';
        }
        return this._photoList[this._counter];
    }
}

export default PhotoAlbum;