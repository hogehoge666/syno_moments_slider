class DisplayPhotoCommands {
    constructor(album, displayDate, displayImage) {
        this.album = album;
        this.displayDate = displayDate;
        this.displayImage = displayImage;
    }

    do() {
        // Todo: use promise all
        const photo = this.getCurrentAlbumPhoto();
        this.displayImage.do(photo.cache_key, photo.id);
        this.displayDate.do(photo.time);
    }

    getCurrentAlbumPhoto() {
        return this.album.get();
    }
}

export default DisplayPhotoCommands;