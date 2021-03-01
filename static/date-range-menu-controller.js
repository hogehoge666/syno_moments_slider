import MenuController from "./menu-controller.js";

class DateRangeMenuController extends MenuController{
    constructor(homeView, dateRangeMenuView, dateRangePhotoListGateway) {
        super(homeView);
        this.dateRangeMenuView = dateRangeMenuView;
        this.dateRangePhotoListGateway = dateRangePhotoListGateway;
    }

    async getPhotoList(inputStartDate, inputEndDate) {
        const result = this.validateDateInput(inputStartDate, inputEndDate);
        this.changeMinMaxOfDateInput(inputStartDate, inputEndDate);
        this.changeHomeStatusMessage(result.message);
        if (!result.success) {
            return [];
        }
        const list = await this.dateRangePhotoListGateway.find(inputStartDate, inputEndDate);
        this.changeHomeStartButtonStatus(list.length <= 0);
        this.changeHomeStatusMessage(`Found ${list.length} images.`);
        return list;
    }

    changeMinMaxOfDateInput(inputStartDate, inputEndDate) {
        this.dateRangeMenuView.changeMaxOfStartDateInput(inputEndDate);
        this.dateRangeMenuView.changeMinOfEndDateInput(inputStartDate);
    }

    validateDateInput(inputStartDate, inputEndDate) {
        if (inputStartDate === '' || inputEndDate === '') {
            return {
                success: false,
                message: 'either start date or end date is empty'
            }
        }
        if (Date.parse(inputStartDate) > Date.parse(inputEndDate)) {
            return {
                success: false,
                message: 'start date is later than end date'
            }
        }
        return {
            success: true,
            message: 'fetching a list from Moments...'
        }
    }


}

export default DateRangeMenuController;