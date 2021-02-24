class MomentsPhotoGW {
    constructor(synoAddr, synoPort, username, password) {
        this.synoHost = `http://${synoAddr}:${synoPort}`;
        this.username = username;
        this.password = password;
        this.getOptions = {
            method: 'GET',
            redirect: 'follow'
        }
    }

    getPhotos() {
        return [
            {
                "cache_key": "9431_1610339138",
                "id": 9431,
                "date": "1/11/2021"
            },
            {
                "cache_key": "9394_1610172030",
                "id": 9394,
                "date": "1/9/2021"
            },
            {
                "cache_key": "9393_1610172025",
                "id": 9393,
                "date": "1/9/2021"
            }
        ];
    }

    login() {
        const targetUrl = `${this.synoHost}/webapi/auth.cgi?api=SYNO.API.Auth&version=6&method=login&account=${this.username}&passwd=${this.password}&session=FileStation&format=cookie`;
        return this.getData(targetUrl)
            .then(result => {
                if (!result.success) {
                    return Promise.reject('Login Failed.');
                }
                console.log(result.data.sid);
                return Promise.resolve(result.success);
            });
    }

    logout() {
        const targetUrl = `${this.synoHost}/webapi/auth.cgi?api=SYNO.API.Auth&version=6&method=logout&session=FileStation`;
        return this.getData(targetUrl)
            .then(result => {
                return Promise.resolve(result.success);
            });
    }

    getPhotoInBase64(cacheKey, id) {
        const targetUrl = `${this.synoHost}/webapi/entry.cgi?api="SYNO.Photo.Thumbnail"&version=1&method="get"&id=${id}&cache_key="${cacheKey}"&type="unit"&size="sm"`;
        return this.getData(targetUrl)
            .then((result) => {
                if (typeof result.success === 'undefined') {
                    // this is a blob, not a JSON object
                    if (typeof process !== 'undefined') {
                        // For passing Jest
                        result = new Blob(result.buffer, { type: result.type });
                    }
                }
                if (result instanceof Blob) {
                    return this.convertBlobToBase64(result);
                } else if (!result.success && result.error.code === 119) {
                    console.log('Reauthenticate');
                    return this.login()
                        .then(() => this.getPhotoInBase64(targetUrl));
                }
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

    getData(targetUrl) {
        return fetch(targetUrl, this.getOptions)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(`Fetch Error. ${response.status}: ${response.statusText}`);
                }
                const contentType = response.headers.get('Content-type');
                if (contentType.includes('image/jpeg')) {
                    return response.blob();
                } else if (contentType.includes('application/json') || contentType.includes('text/plain')) {
                    return response.json();
                } else {
                    return Promise.reject(`Fetch Error.  Unexpected Content-type:${contentType}`);
                }
            });
    }
}

export default MomentsPhotoGW;
