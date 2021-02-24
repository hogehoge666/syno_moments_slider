import SimpleView from '../../static/simple-photo/view'
global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        src: '',
        innerHTML: ''
    };
});

describe('SimpleView', () => {
    let view = null;
    beforeEach(() => {
        global.document.getElementById.mockClear();
        view = new SimpleView();
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
});