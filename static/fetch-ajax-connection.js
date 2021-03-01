class FetchAjaxConnection {
    constructor(synoAddr, synoPort, username, password) {
        this.synoHost = `http://${synoAddr}:${synoPort}`;
        this.username = username;
        this.password = password;
        this.getOptions = {
            method: 'GET',
            redirect: 'follow'
        }
    }

    getData(targetPathQuery) {
        return fetch(`${this.synoHost}${targetPathQuery}`, this.getOptions)
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

    login() {
        const targetPathQuery = `/webapi/auth.cgi?api=SYNO.API.Auth&version=6&method=login&account=${this.username}&passwd=${this.password}&session=FileStation&format=cookie`;
        return this.getData(targetPathQuery)
            .then(result => {
                if (!result.success) {
                    return Promise.reject('Login Failed.');
                }
                console.log(result.data.sid);
                return Promise.resolve(result.success);
            });
    }

    logout() {
        const targetPathQuery = `/webapi/auth.cgi?api=SYNO.API.Auth&version=6&method=logout&session=FileStation`;
        return this.getData(targetPathQuery)
            .then(result => {
                console.log('released token')
                return Promise.resolve(result.success);
            });
    }

}

export default FetchAjaxConnection;