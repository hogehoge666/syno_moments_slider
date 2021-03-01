class Gateway {
    constructor(ajaxConnection) {
        this.ajax = ajaxConnection;
    }

    connect() {
        return this.ajax.login();
    }

    disconnect() {
        return this.ajax.logout();
    }
}

export default Gateway;