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

    getPhotoList(startInputDate, endInputDate) {
        return this.getPhotosFromMoments(startInputDate, endInputDate)
            .then((detailList) => this.summarize(detailList))
            .then((summaryList) => summaryList.reverse());
    }

    summarize(momentsDetailList) {
        return momentsDetailList.data.list.map((value, key, array) => {
            return {
                cache_key: value.additional.thumbnail.cache_key,
                date: this.convertMomentsTimeToStrDate(value.time),
                id: value.id
            }
        });
    }

    getPhotosFromMoments(startInputDate, endInputDate) {
        const startTime = this.convertInputDateToStartMomentsTime(startInputDate);
        const endTime = this.convertInputDateToEndMomentsTime(endInputDate);
        const targetUrl = `${this.synoHost}/webapi/entry.cgi?api="SYNO.Photo.Browse.Item"&version=3&method="list"&start_time=${startTime}&end_time=${endTime}&additional=["thumbnail","resolution","orientation","video_convert","video_meta"]&offset=0&limit=5000`;
        return this.getData(targetUrl);
    }

    convertInputDateToStartMomentsTime(dateDashed) {
        return this.convertInputDateToMomentsTime(dateDashed, '00:00:00');
    }

    convertInputDateToEndMomentsTime(dateDashed) {
        return this.convertInputDateToMomentsTime(dateDashed, '23:59:59');
    }

    convertInputDateToMomentsTime(dateDashed, time) {
        return this.convertToUnixUTCTime(dateDashed, time);
    }

    convertToUnixUTCTime(dateDashed, time) {
        const [yearStr, monthStr, dateStr] = dateDashed.split('-');
        const [hoursStr, minutesStr, secondsStr] = time.split(':');
        const utcTime = Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dateStr),
            Number(hoursStr), Number(minutesStr), Number(secondsStr));
        return utcTime / 1000;
    }

    convertMomentsTimeToStrDate(momentsTime) {
        const date = new Date(momentsTime * 1000);
        const utcYear = date.getUTCFullYear();
        const utcMonth = date.getUTCMonth() + 1;
        const utcDate = date.getUTCDate();
        const utcHours = date.getUTCHours();
        const utcMins = date.getUTCMinutes();
        const utcSecs = date.getUTCSeconds();
        return `${utcYear}/${utcMonth}/${utcDate} ${utcHours}:${utcMins}:${utcSecs}`;
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
