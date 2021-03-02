import DateRangePhotoListGateway from "../static/date-range-photo-list-gateway";
import FetchAjaxConnection from "../static/fetch-ajax-connection";
import ENV from '../static/env/env.json.js';
const nodeFetch = require('node-fetch');
global.fetch = require('fetch-cookie')(nodeFetch);

const testValidStartDate = '2021-01-09';
const testValidEndDate = '2021-01-10';
const testValidPathQuery = '/webapi/entry.cgi?api="SYNO.Photo.Browse.Item"&version=3&method="list"&start_time=1610150400&end_time=1610323199&additional=["thumbnail","resolution","orientation","video_convert","video_meta"]&offset=0&limit=5000'

describe('DateRangePhotoListGateway', () => {

    let photoListGateway = null;
    beforeEach(() => {
        const ajaxConnection = new FetchAjaxConnection(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, ENV.SYNO_USER, ENV.SYNO_PASSWORD);
        photoListGateway = new DateRangePhotoListGateway(ajaxConnection);
    });

    afterEach(() => {
        photoListGateway.disconnect();
    });

    it('should convert an input date to beginning of the day in Unix UTC time', () => {
        expect(photoListGateway.convertInputDateToStartMomentsTime('2021-01-09')).toBe(1610150400);
    });

    it('should convert a date to end of the day in Unix UTC time', () => {
        expect(photoListGateway.convertInputDateToEndMomentsTime('2021-01-10')).toBe(1610323199);
    });


    describe('find', () => {
        it('should return list of photos taken in given period that includes cache_key, id, and time', () => {
           return photoListGateway.connect()
               .then(() => photoListGateway.find(testValidStartDate, testValidEndDate))
               .then((list) => {
                   expect(list.length).toBeGreaterThan(0);
                   expect(list[0].cache_key).toBeDefined();
                   expect(list[0].id).toBeDefined();
                   expect(list[0].time).toBeDefined();
               });
        });
    });

    describe('login and logout', () => {
        it('should login to Momemnts and logout from Moments', () => {
            return photoListGateway.connect()
                .then((success) => {
                    expect(success).toBeTruthy();
                    return photoListGateway.disconnect();
                })
                .then((success) => {
                    expect(success).toBeTruthy();
                });
        });

        // slow test.  may skip in development.
        it.skip('should return rejected Promise when login failed', () => {
            jest.setTimeout(10000);
            const ajaxConnection = new FetchAjaxConnection(ENV.SYNO_ADDRESS, ENV.SYNO_PORT, 'wronguser', 'wrongpass');
            const photoListGateway = new DateRangePhotoListGateway(ajaxConnection);
            return expect(photoListGateway.connect()).rejects.toBe('Login Failed.');
        });
    });
});


