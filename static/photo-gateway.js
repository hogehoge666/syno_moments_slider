import Gateway from "./gateway.js";

class PhotoGateway extends Gateway {
    constructor(ajaxConnection) {
        super(ajaxConnection);
    }

    findByCacheId(cacheKey, id) {
        const targetPathQuery = `/webapi/entry.cgi?api="SYNO.Photo.Thumbnail"&version=1&method="get"&id=${id}&cache_key="${cacheKey}"&type="unit"&size="sm"`;
        return this.ajax.getData(targetPathQuery)
            .then((result) => {
                // For passing Jest
                if (typeof result.success === 'undefined') {
                    // This is a blob, but Node thinks this is something else and test fails.
                    // Create new blob for Node if executed inside Node.
                    if (typeof process !== 'undefined') {
                        result = new Blob(result.buffer, { type: result.type });
                    }
                }
                if (result instanceof Blob) {
                    return result;
                } else if (!result.success && result.error.code === 119) {
                    console.log('Reauthenticate');
                    return this.connect()
                        .then(() => this.findByCacheId(targetPathQuery));
                }
            });
    }

    // Todo: move to DisplayImageCommand
    // convertBlobToBase64(blob) {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader;
    //         reader.onerror = () => {
    //             reject('Error Converting An Image to Base64 Format:' + cacheKey);
    //         };
    //         reader.onloadend = () => {
    //             resolve(reader.result);
    //         };
    //         if (typeof process === 'undefined') {
    //             // For browser
    //             reader.readAsDataURL(blob);
    //         } else {
    //             // For passing Jest
    //             const blobNode = new Blob(blob.buffer, { type: blob.type });
    //             reader.readAsDataURL(blobNode);
    //         }
    //     });
    // }
}

export default PhotoGateway;