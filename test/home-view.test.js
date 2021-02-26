import HomeView from "../static/home-view";

global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        disabled: '',
        innerHTML: '',
        min: '',
        max: ''
    }
});

let homeView = null;
beforeEach(() => {
    homeView = new HomeView();
    global.document.getElementById.mockClear();
});

describe('setStatusMessage', () => {
    it('should set pause message', () => {
        homeView.setStatusMessage('test');
        expect(global.document.getElementById).toHaveBeenCalledTimes(1);
        expect(global.document.getElementById).toHaveBeenCalledWith('status-message');
    });
});

describe('setStartButtonStatus', () => {
    it('should call set disabled property', () => {
        homeView.setStartButtonStatus(true);
        expect(global.document.getElementById).toHaveBeenCalledTimes(1);
        expect(global.document.getElementById).toHaveBeenCalledWith('start');
    });
});

describe('changeMaxOfStartDateInput', () => {
    it('should call set min property of start date input', () => {
        homeView.changeMaxOfStartDateInput('2021-1-1');
        expect(global.document.getElementById).toHaveBeenCalledTimes(1);
        expect(global.document.getElementById).toHaveBeenCalledWith('start-date');
    });
});

describe('changeMinOfEndDateInput', () => {
    it('should call set max property of end date input', () => {
        homeView.changeMinOfEndDateInput('2021-1-1');
        expect(global.document.getElementById).toHaveBeenCalledTimes(1);
        expect(global.document.getElementById).toHaveBeenCalledWith('end-date');
    });
});