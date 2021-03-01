class HomeMenuView {
    setStatusMessage(message) {
        document.getElementById('status-message').innerHTML = message;
    }

    setStartButtonStatus(flag) {
        document.getElementById('start').disabled = flag;
    }
}

export default HomeMenuView;