import MomentsPhotoGW from "../../static/moments/gateway";
import ENV from '../../static/env.json';
const nodeFetch = require('node-fetch');
global.fetch = require('fetch-cookie')(nodeFetch);

describe('MomentsPhotoGW', () => {

    let gw = null;
    beforeEach(() => {
        gw = new MomentsPhotoGW(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, ENV.SYNO_USER, ENV.SYNO_PASSWORD);
    });

    afterEach(() => {
        gw.logout();
    });

    describe('getPhotos', () => {
        it('should should return list of photo objects that includes cache_key, id, and time', () => {
            const list = gw.getPhotos();
            expect(list.length).toBeGreaterThan(0);
            expect(list[0].cache_key).toBeDefined();
            expect(list[0].id).toBeDefined();
            expect(list[0].date).toBeDefined();
        });        
    });

    describe('login and logout', () => {
        it('should login to Momemnts and logout from Moments', () => {
            return gw.login()
                .then((success) => {
                    expect(success).toBeTruthy();
                    return gw.logout();
                })
                .then((success) => {
                    expect(success).toBeTruthy();
                });
        });

        // slow test.  may skip in development.
        it('should return rejected Promise when login failed', () => {
            jest.setTimeout(10000);
            const gw = new MomentsPhotoGW(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, 'wronguser', 'wrongpass');
            return expect(gw.login()).rejects.toBe('Login Failed.');
        });
    });


    describe('getPhotoInBase64', () => {
        it('should get a photo in Base64 format from Moments', () => {
            jest.setTimeout(3000);
            return gw.login()
                .then(() => gw.getPhotoInBase64('9431_1610339138', '9431'))
                .then((result) => {
                    expect(result).toContain('data:image/');
                });
        });

        it('should reathenticate and retry if token expires', () => {
            return gw.logout()
                .then(() => gw.getPhotoInBase64('9431_1610339138', '9431'))
                .then((result) => {
                    expect(result).toContain('data:image/');
                });
        });

        it('should return rejected Promise when the specifed photo is not found on Moments', () => {
            return expect(gw.getPhotoInBase64('1111_1111111111', '1111')).rejects.toBe('Fetch Error. 404: Not Found')
        });
    });

});


