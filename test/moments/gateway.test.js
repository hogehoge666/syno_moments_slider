import MomentsPhotoGW from "../../static/moments/gateway";
import ENV from '../../static/env/env.json.js';
const nodeFetch = require('node-fetch');
global.fetch = require('fetch-cookie')(nodeFetch);

const testValidPhotoCacheKey = '9431_1610339138';
const testValidPhotoId = '9431';
const testValidStartDate = '2021-01-09';
const testValidEndDate = '2021-01-10';

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
           return gw.login()
               .then(() => gw.getPhotoList(testValidStartDate, testValidEndDate))
               .then((list) => {
                   expect(list.length).toBeGreaterThan(0);
                   expect(list[0].cache_key).toBeDefined();
                   expect(list[0].id).toBeDefined();
                   expect(list[0].date).toBeDefined();
               });
        });

        it('should convert an input date to beginning of the day in Unix UTC time', () => {
            expect(gw.convertInputDateToStartMomentsTime('2021-01-09')).toBe(1610150400);
        });

        it('should convert a date to end of the day in Unix UTC time', () => {
            expect(gw.convertInputDateToEndMomentsTime('2021-01-10')).toBe(1610323199);
        });

        it('should convert a moments date to string date for display', function () {
            expect(gw.convertMomentsTimeToStrDate(1610313594)).toBe('2021/1/10 21:19:54')
        });

        it('should get list of photos taken in given period from Moments', () => {
            return gw.login()
                .then(() => gw.getPhotosFromMoments(testValidStartDate, testValidEndDate))
                .then(result => {
                    expect(result.success).toBeTruthy();
                    expect(result.data).toBeDefined();
                });
        });

        it('should summarize list of photos from Moments', () => {
            const srcList = {
                "data": {
                    "list": [
                        {
                            "additional": {
                                "orientation": 1,
                                "orientation_original": 1,
                                "resolution": {
                                    "height": 4032,
                                    "width": 3024
                                },
                                "thumbnail": {
                                    "cache_key": "9431_1610339138",
                                    "m": "ready",
                                    "preview": "broken",
                                    "sm": "ready",
                                    "unit_id": 9431,
                                    "xl": "ready"
                                }
                            },
                            "enhancement_applied": false,
                            "filename": "IMG_2123.HEIC",
                            "filesize": 1907437,
                            "id": 9431,
                            "indexed_time": 1610371535024,
                            "place": "photo",
                            "time": 1610313594,
                            "type": "photo"
                        },
                        {
                            "additional": {
                                "orientation": 1,
                                "orientation_original": 1,
                                "resolution": {
                                    "height": 6000,
                                    "width": 4000
                                },
                                "thumbnail": {
                                    "cache_key": "9394_1610172030",
                                    "m": "ready",
                                    "preview": "broken",
                                    "sm": "ready",
                                    "unit_id": 9394,
                                    "xl": "ready"
                                }
                            },
                            "enhancement_applied": false,
                            "filename": "IMG_7882.JPG",
                            "filesize": 14537757,
                            "id": 9394,
                            "indexed_time": 1610204399082,
                            "place": "photo",
                            "time": 1610189163,
                            "type": "photo"
                        },
                        {
                            "additional": {
                                "orientation": 1,
                                "orientation_original": 1,
                                "resolution": {
                                    "height": 6000,
                                    "width": 4000
                                },
                                "thumbnail": {
                                    "cache_key": "9393_1610172025",
                                    "m": "ready",
                                    "preview": "broken",
                                    "sm": "ready",
                                    "unit_id": 9393,
                                    "xl": "ready"
                                }
                            },
                            "enhancement_applied": false,
                            "filename": "IMG_7876.JPG",
                            "filesize": 14762771,
                            "id": 9393,
                            "indexed_time": 1610204397041,
                            "place": "photo",
                            "time": 1610189118,
                            "type": "photo"
                        }
                    ]
                },
                "success": true
            };
            expect(gw.summarize(srcList)).toEqual([
                {
                    "cache_key": "9431_1610339138",
                    "id": 9431,
                    "date": "2021/1/10 21:19:54"
                },
                {
                    "cache_key": "9394_1610172030",
                    "id": 9394,
                    "date": "2021/1/9 10:46:3"
                },
                {
                    "cache_key": "9393_1610172025",
                    "id": 9393,
                    "date": "2021/1/9 10:45:18"
                }
            ]);
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
                .then(() => gw.getPhotoInBase64(testValidPhotoCacheKey, testValidPhotoId))
                .then((result) => {
                    expect(result).toContain('data:image/');
                });
        });

        it('should reathenticate and retry if token expires', () => {
            return gw.logout()
                .then(() => gw.getPhotoInBase64(testValidPhotoCacheKey, testValidPhotoId))
                .then((result) => {
                    expect(result).toContain('data:image/');
                });
        });

        it('should return rejected Promise when the specifed photo is not found on Moments', () => {
            return expect(gw.getPhotoInBase64('1111_1111111111', '1111')).rejects.toBe('Fetch Error. 404: Not Found')
        });
    });

});


