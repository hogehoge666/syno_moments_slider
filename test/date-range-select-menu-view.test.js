import DateRangeSelectMenuView from "../static/date-range-select-menu-view";

global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        min: '',
        max: ''
    }
});

let dateRangeMenuView = null;
beforeEach(() => {
    dateRangeMenuView = new DateRangeSelectMenuView();
    global.document.getElementById.mockClear();
});


describe('changeMaxOfStartDateInput', () => {
    it('should call set min property of start date input', () => {
        dateRangeMenuView.changeMaxOfStartDateInput('2021-1-1');
        expect(global.document.getElementById).toHaveBeenCalledTimes(1);
        expect(global.document.getElementById).toHaveBeenCalledWith('start-date');
    });
});

describe('changeMinOfEndDateInput', () => {
    it('should call set max property of end date input', () => {
        dateRangeMenuView.changeMinOfEndDateInput('2021-1-1');
        expect(global.document.getElementById).toHaveBeenCalledTimes(1);
        expect(global.document.getElementById).toHaveBeenCalledWith('end-date');
    });
});