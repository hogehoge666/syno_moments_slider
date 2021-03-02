import SliderView from "../static/slider-view";
global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        src: '',
        innerHTML: ''
    };
});

describe('SliderView', () => {
    let sliderView = null;
    beforeEach(() => {
        global.document.getElementById.mockClear();
        sliderView = new SliderView();
    });

    describe('setImage', () => {
        it('should display the view', () => {
            sliderView.setImage('test');
            expect(global.document.getElementById).toHaveBeenCalledTimes(1);
            expect(global.document.getElementById).toHaveBeenCalledWith('photo');
        });
    });

    describe('setDateMessage', () => {
        it('should display the view', () => {
            const photoInBase64 = 'data:image/jpeg;charset=utf-8;base64,FOOBAR';
            const date = 'some date';
            sliderView.setDateMessage('test');
            expect(global.document.getElementById).toHaveBeenCalledTimes(1);
            expect(global.document.getElementById).toHaveBeenCalledWith('date-message');
        });
    });

    describe('setPauseAndPlayMessage', () => {
        it('should call set pause message', () => {
            sliderView.setPlayPauseMessage('test');
            expect(global.document.getElementById).toHaveBeenCalledTimes(1);
            expect(global.document.getElementById).toHaveBeenCalledWith('pause');
        });
    });
});