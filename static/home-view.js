class HomeView {
    setStatusMessage(message) {
        document.getElementById('status-message').innerHTML = message;
    }

    setStartButtonStatus(flag) {
        document.getElementById('start').disabled = flag;
    }

    changeMaxOfStartDateInput(inputEndDate) {
        document.getElementById('start-date').max = inputEndDate;
    }

    changeMinOfEndDateInput(inputStartDate) {
        document.getElementById('end-date').min = inputStartDate;
    }
}

export default HomeView;