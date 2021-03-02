import SelectMenuController from "./select-menu-controller.js";

class DateRangeSelectMenuController extends SelectMenuController{
    constructor(homeView, dateRangeSelectMenuView, dateRangePhotoListGateway) {
        super(homeView);
        this.dateRangeSelectMenuView = dateRangeSelectMenuView;
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
        this.dateRangeSelectMenuView.changeMaxOfStartDateInput(inputEndDate);
        this.dateRangeSelectMenuView.changeMinOfEndDateInput(inputStartDate);
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

export default DateRangeSelectMenuController;