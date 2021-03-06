class SliderView {
    setImage(imageSource) {
        document.getElementById('photo').src = imageSource;
    }

    setDateMessage(date) {
        document.getElementById('date-message').innerHTML = date;
    }

    setPlayPauseMessage(message) {
        document.getElementById('pause').innerHTML = message;
    }
}

export default SliderView;