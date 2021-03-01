import Gateway from "./gateway.js";
import PhotoListPresenter from "./photo-list-presenter.js";

class DateRangePhotoListGateway extends Gateway {
    constructor(ajaxConnection) {
        super(ajaxConnection);
    }

    find(inputStartDate, inputEndDate) {
        const targetPathQuery = this.buildPathQuery(inputStartDate, inputEndDate);
        return this.connect()
            .then(() => this.ajax.getData(targetPathQuery))
            .then((rawList) => PhotoListPresenter.present(rawList))
            .finally(() => this.disconnect());
    }

    buildPathQuery(startInputDate, endInputDate) {
        const startTime = this.convertInputDateToStartMomentsTime(startInputDate);
        const endTime = this.convertInputDateToEndMomentsTime(endInputDate);
        return `/webapi/entry.cgi?api="SYNO.Photo.Browse.Item"&version=3&method="list"&start_time=${startTime}&end_time=${endTime}&additional=["thumbnail","resolution","orientation","video_convert","video_meta"]&offset=0&limit=5000`;
    }

    convertInputDateToStartMomentsTime(dateDashed) {
        return this.convertToUnixUTCTime(dateDashed, '00:00:00');
    }

    convertInputDateToEndMomentsTime(dateDashed) {
        return this.convertToUnixUTCTime(dateDashed, '23:59:59');
    }

    convertToUnixUTCTime(dateDashed, time) {
        const [yearStr, monthStr, dateStr] = dateDashed.split('-');
        const [hoursStr, minutesStr, secondsStr] = time.split(':');
        const utcTime = Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dateStr),
            Number(hoursStr), Number(minutesStr), Number(secondsStr));
        return utcTime / 1000;
    }
}

export default DateRangePhotoListGateway;
