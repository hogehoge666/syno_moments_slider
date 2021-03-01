import HomeMenuView from "../static/home-menu-view";

global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        disabled: '',
        innerHTML: '',
    }
});

let homeView = null;
beforeEach(() => {
    homeView = new HomeMenuView();
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

