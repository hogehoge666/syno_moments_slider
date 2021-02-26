import MomentsPhotoGW from '../../static/moments/gateway';
import MomentsSliderView from '../../static/moments/slider-view';
import ENV from '../../static/env/env.json.js';
jest.mock('../../static/moments/gateway');
const nodeFetch = require('node-fetch');
global.fetch = require('fetch-cookie')(nodeFetch);
global.document.getElementById = jest.fn();
global.document.getElementById.mockImplementation(() => {
    return {
        src: '',
        innerHTML: ''
    };
});

describe('MomentsView', () => {
    let gw = null;
    let view = null;
    beforeEach(() => {
        MomentsPhotoGW.mockClear();
        global.document.getElementById.mockClear();
        gw = new MomentsPhotoGW(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, ENV.SYNO_USER, ENV.SYNO_PASSWORD);
        view = new MomentsSliderView(gw);
    });

    describe('getPhotoInBase64', () => {
        it('should call MomentsPhotoGW.getPhotoInBase64', () => {
            MomentsPhotoGW.mock.instances[0].getPhotoInBase64.mockImplementation(() => Promise.resolve());
            return view.getPhotoInBase64({
                "cache_key": "9431_1610339138",
                "id": 9431,
                "date": "1/11/2021"
            })
                .then(() => {
                    expect(MomentsPhotoGW.mock.instances[0].getPhotoInBase64).toHaveBeenCalledTimes(1);
                });
        });        
    });

    describe('displayView', () => {
        it('should display the view', () => {
            const photoInBase64 = 'data:image/jpeg;charset=utf-8;base64,FOOBAR';
            const date = 'some date';
            view.displayView(photoInBase64, date);
            expect(global.document.getElementById).toHaveBeenCalledTimes(2);
            expect(global.document.getElementById).toHaveBeenNthCalledWith(1, 'photo');
            expect(global.document.getElementById).toHaveBeenNthCalledWith(2, 'info');
        });        
    });

    describe('show', () => {
        it('should call getPhotoInBase64 and displayView', async () => {
            view.getPhotoInBase64 = jest.fn();
            view.getPhotoInBase64.mockImplementation(() => Promise.resolve());
            view.displayView = jest.fn();
            await view.show({
                "cache_key": "9431_1610339138",
                "id": 9431,
                "date": "1/11/2021"
            });
            expect(view.getPhotoInBase64).toHaveBeenCalledTimes(1);
            expect(view.displayView).toHaveBeenCalledTimes(1);
        });        
    });

    describe('setPauseAndPlayMessage', () => {
        it('should call set pause message', () => {
            view.setPauseAndPlayMessage('test');
            expect(global.document.getElementById).toHaveBeenCalledTimes(1);
            expect(global.document.getElementById).toHaveBeenCalledWith('pause');
        });
    });
});