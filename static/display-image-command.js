import BlobToBase64Converter from "./blob-to-base64-converter.js";

class DisplayImageCommand {
    constructor(sliderView, photoGateway) {
        this.sliderView = sliderView;
        this.photoGateway = photoGateway;
    }

    do(photo) {
        return this.photoGateway.findByCacheId(photo.cache_key, photo.id)
            .then((imageBlob) => BlobToBase64Converter.convert(imageBlob))
            .then((photoInBase64) => {
                this.sliderView.setImage(photoInBase64);
                return Promise.resolve();
            });
    }
}

export default DisplayImageCommand;