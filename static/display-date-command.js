class DisplayDateCommand {
    constructor(sliderView) {
        this.sliderView = sliderView;
    }

    do(photo) {
        return new Promise((resolve) => {
            let date = '';
            if (typeof photo !== 'undefined' && typeof photo.time !== 'undefined') {
                date = this.convertMomentsTimeToStrDate(photo.time);
            }
            this.sliderView.setDateMessage(date);
            resolve();
        });
    }

    convertMomentsTimeToStrDate(time) {
        const date = new Date(time * 1000);
        const utcYear = date.getUTCFullYear();
        const utcMonth = date.getUTCMonth() + 1;
        const utcDate = date.getUTCDate();
        const utcHours = ('0' + date.getUTCHours()).slice(-2);
        const utcMinutes = ('0' + date.getUTCMinutes()).slice(-2);
        const utcSecs = ('0' + date.getUTCSeconds()).slice(-2);
        return `${utcYear}/${utcMonth}/${utcDate} ${utcHours}:${utcMinutes}:${utcSecs}`;
    }
}

export default DisplayDateCommand;