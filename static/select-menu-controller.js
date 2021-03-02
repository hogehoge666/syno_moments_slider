class SelectMenuController {
    constructor(homeView) {
        this.homeView = homeView;
    }

    changeHomeStatusMessage(message) {
        this.homeView.setStatusMessage(message);
    }

    changeHomeStartButtonStatus(flag) {
        this.homeView.setStartButtonStatus(flag)
    }

    getPhotoList(inputStartDate, inputEndDate) {
        throw new Error('Not Implemented.');
    }
}

export default SelectMenuController;