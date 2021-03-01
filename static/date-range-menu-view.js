class DateRangeMenuView {
    changeMaxOfStartDateInput(inputEndDate) {
        document.getElementById('start-date').max = inputEndDate;
    }

    changeMinOfEndDateInput(inputStartDate) {
        document.getElementById('end-date').min = inputStartDate;
    }
}

export default DateRangeMenuView;