class SimpleSliderView {
    show(photo) {
        document.getElementById('photo').src = photo.url;
        document.getElementById('info').innerHTML = photo.date;
        console.log(photo);
    }

    setPlayPauseMessage(message) {
        document.getElementById('pause').innerHTML = message;
    }
}

export default SimpleSliderView;