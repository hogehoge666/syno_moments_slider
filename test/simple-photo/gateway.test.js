import SimplePhotoGW from "../../static/simple-photo/gateway";

describe('PhotoGateway', () => {
    it('should return list of photo objects that includes url and date', () => {
        const list = SimplePhotoGW.getPhotos();
        expect(list.length).toBeGreaterThan(0);
        expect(typeof list[0]).toBe('object');
        expect(list[0].url).toBeDefined();
        expect(list[0].date).toBeDefined();
    });
});