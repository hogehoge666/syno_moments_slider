class DisplayDateCommand {
    constructor(sliderView) {
        this.sliderView = sliderView;
    }

    do(time) {
        const date = this.convertMomentsTimeToStrDate(time);
        this.sliderView.setDateMessage(date);
    }

    convertMomentsTimeToStrDate(time) {
        const date = new Date(time * 1000);
        const utcYear = date.getUTCFullYear();
        const utcMonth = date.getUTCMonth() + 1;
        const utcDate = date.getUTCDate();
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
        const utcSecs = date.getUTCSeconds();
        return `${utcYear}/${utcMonth}/${utcDate} ${utcHours}:${utcMinutes}:${utcSecs}`;
    }
}

export default DisplayDateCommand;