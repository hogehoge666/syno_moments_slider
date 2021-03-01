import SimpleSliderView from '../../static/simple-photo/slider-view'
global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        src: '',
        innerHTML: ''
    };
});

describe.skip('SimpleView', () => {
    let view = null;
    beforeEach(() => {
        global.document.getElementById.mockClear();
        view = new SimpleSliderView();
    });

    describe('show', () => {
        it('should populate ID photo and ID info', () => {
            view.show({
                url: 'some url',
                date: 'some date'
            });
            expect(global.document.getElementById).toHaveBeenCalledTimes(2);
            expect(global.document.getElementById).toHaveBeenNthCalledWith(1, 'photo')
            expect(global.document.getElementById).toHaveBeenNthCalledWith(2, 'info');
        });
    });

    describe('setPauseAndPlayMessage', () => {
        it('should call set pause message', () => {
            view.setPlayPauseMessage('test');
            expect(global.document.getElementById).toHaveBeenCalledTimes(1);
            expect(global.document.getElementById).toHaveBeenCalledWith('pause');
        });
    });
});