class MomentsPhotoListGetter {
    constructor(gw, homeView) {
        this.gw = gw;
        this.homeView = homeView;
    }

    async getPhotoList(inputStartDate, inputEndDate) {
        const result = this.validateDateInput(inputStartDate, inputEndDate);
        this.changeMinMaxOfDateInput(inputStartDate, inputEndDate);
        this.changeStatusMessage(result.message);
        if (!result.success) {
            return [];
        }
        const list = await this._getPhotoList(inputStartDate, inputEndDate);
        this.toggleStartButtonStatus(list.length <= 0);
        this.changeStatusMessage(`Found ${list.length} images.`);
        return list;
    }

    _getPhotoList(inputStartDate, inputEndDate) {
        return this.gw.login()
            .then(() => this.gw.getPhotoList(inputStartDate, inputEndDate))
            .finally(() => this.gw.logout());
    }

    changeMinMaxOfDateInput(inputStartDate, inputEndDate) {
        this.homeView.changeMaxOfStartDateInput(inputEndDate);
        this.homeView.changeMinOfEndDateInput(inputStartDate);
    }

    changeStatusMessage(message) {
        this.homeView.setStatusMessage(message);
    }

    toggleStartButtonStatus(flag) {
        this.homeView.setStartButtonStatus(flag)
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

export default MomentsPhotoListGetter;