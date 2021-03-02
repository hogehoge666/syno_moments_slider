import SimpleSliderView from '../../static/simple-photo/slider-view';

global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        src: '',
        innerHTML: ''
    };
});

describe('SimpleView', () => {
    let simpleSliderView = null;
    beforeEach(() => {
        global.document.getElementById.mockClear();
        simpleSliderView = new SimpleSliderView();
    });

    describe('show', () => {
        it('should populate ID photo and ID info', () => {
            simpleSliderView.show({
                url: 'some url',
                date: 'some date'
            });
            expect(global.document.getElementById).toHaveBeenCalledTimes(2);
            expect(global.document.getElementById).toHaveBeenNthCalledWith(1, 'photo')
            expect(global.document.getElementById).toHaveBeenNthCalledWith(2, 'info');
        });
    });

    describe('setPlayPauseMessage', () => {
        it('should call set pause message', () => {
            simpleSliderView.setPlayPauseMessage('test');
            expect(global.document.getElementById).toHaveBeenCalledTimes(1);
            expect(global.document.getElementById).toHaveBeenCalledWith('pause');
        });
    });
});