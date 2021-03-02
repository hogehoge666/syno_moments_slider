class DisplayPhotoCommands {
    constructor(album, displayImage, infoCommandList) {
        this.album = album;
        this.displayImage = displayImage;
        this.infoCommandsList = infoCommandList;
        this.counter = 0;
    }

    do() {
        const photo = this.getCurrentAlbumPhoto();
        this.displayImage.do(photo);
        this.displayInfo(photo);
    }

    displayInfo(photo) {
        this.infoCommandsList[this.counter].forEach((value, index, array) => {
            value.do(photo);
        });
    }

    toggleInfo(){
        this.displayInfo();
        this.counter++;
        if(this.counter === this.infoCommandsList.length) {
            this.counter = 0;
        }
        const photo = this.getCurrentAlbumPhoto();
        this.displayInfo(photo);
    }

    getCurrentAlbumPhoto() {
        return this.album.get();
    }
}

export default DisplayPhotoCommands;