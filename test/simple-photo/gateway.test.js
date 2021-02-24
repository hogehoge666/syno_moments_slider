import SimplePhotoGW from "../../static/simple-photo/gateway";

describe('SimplePhotoGateway', () => {
    const gw = new SimplePhotoGW();
    it('should return list of photo objects that includes url and date', () => {
        const list = gw.getPhotos();
        expect(list.length).toBeGreaterThan(0);
        expect(list[0].url).toBeDefined();
        expect(list[0].date).toBeDefined();
    });
});