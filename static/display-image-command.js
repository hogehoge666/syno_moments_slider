class DisplayImageCommand {
    constructor(sliderView, photoGateway) {
        this.sliderView = sliderView;
        this.photoGateway = photoGateway;
    }

    do(cache_key, id) {
        this.photoGateway.findByCacheId(cache_key, id)
            .then((imageBlob) => {
                return this.convertBlobToBase64(imageBlob);
            })
            .then((photoInBase64) => {
                this.sliderView.setImage(photoInBase64);
            });
    }

    convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader;
            reader.onerror = () => {
                reject('Error Converting An Image to Base64 Format:' + cacheKey);
            };
            reader.onloadend = () => {
                resolve(reader.result);
            };
            if (typeof process === 'undefined') {
                // For browser
                reader.readAsDataURL(blob);
            } else {
                // For passing Jest
                const blobNode = new Blob(blob.buffer, { type: blob.type });
                reader.readAsDataURL(blobNode);
            }
        });
    }
}

export default DisplayImageCommand;