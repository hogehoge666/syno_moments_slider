import PhotoGateway from "../static/photo-gateway";
import FetchAjaxConnection from "../static/fetch-ajax-connection";
import ENV from '../static/env/env.json.js';
const nodeFetch = require('node-fetch');
global.fetch = require('fetch-cookie')(nodeFetch);

const testValidPhotoCacheKey = '9431_1610339138';
const testValidPhotoId = '9431';

describe('PhotoGateway', () => {
    let photoGateway = null;
    beforeEach(() => {
        const ajaxConnection = new FetchAjaxConnection(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, ENV.SYNO_USER, ENV.SYNO_PASSWORD);
        photoGateway = new PhotoGateway(ajaxConnection);
    });

    afterEach(() => {
        photoGateway.disconnect();
    });

    describe('findByCacheId', () => {
        it('should get an image of a photo based on cache id in Base64 format from Moments', () => {
            jest.setTimeout(3000);
            return photoGateway.connect()
                .then(() => photoGateway.findByCacheId(testValidPhotoCacheKey, testValidPhotoId))
                .then((result) => {
                    expect(result.type).toContain('image/jpeg');
                });
        });

        it('should reathenticate and retry if token expires', () => {
            return photoGateway.disconnect()
                .then(() => photoGateway.findByCacheId(testValidPhotoCacheKey, testValidPhotoId))
                .then((result) => {
                    expect(result.type).toContain('image/jpeg');
                });
        });

        it('should return rejected Promise when the specifed photo is not found on Moments', () => {
            return expect(photoGateway.findByCacheId('1111_1111111111', '1111')).rejects.toBe('Fetch Error. 404: Not Found')
        });
    });
});