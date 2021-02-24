class MomentsView {
    constructor(momentsPhotoGateway) {
        this.gw = momentsPhotoGateway;
    }

    getPhotoInBase64(photo){
        return this.gw.getPhotoInBase64(photo.cache_key, photo.id);
    }

    displayView(photoInBase64, date) {
        document.getElementById('photo').src = photoInBase64;
        document.getElementById('info').innerHTML = date;
    }

    show(photo) {
        this.getPhotoInBase64(photo)
        .then((photoInBase64) => this.displayView(photoInBase64, photo.date))
    }
}

export default MomentsView;