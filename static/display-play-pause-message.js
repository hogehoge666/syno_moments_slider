class DisplayPlayPauseMessage {
    constructor(sliderView) {
        this.sliderView = sliderView;
    }

    do(message) {
        this.sliderView.setPlayPauseMessage(message);
    }
}

export default DisplayPlayPauseMessage;