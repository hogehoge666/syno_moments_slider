class SimpleView {
    show(photo) {
        document.getElementById('photo').src = photo.url;
        document.getElementById('info').innerHTML = photo.date;
        console.log(photo);
    }
}

export default SimpleView;