class BlobToBase64Converter {
    // Todo: Need Unit Test for this class
    //       This method was covered before decomposing it from another class.
    //       Gap in the interpretation of "blob" makes it hard to make a unit test.
    static convert(blob) {
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

export default BlobToBase64Converter;