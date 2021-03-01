import DisplayPhotoCommands from '../static/display-photo-commands';
import PhotoAlbum from "../static/photo-album";
import DisplayDateCommand from "../static/display-date-command";
import DisplayImageCommand from "../static/display-image-command";
jest.mock("../static/photo-album");
jest.mock("../static/display-date-command");
jest.mock("../static/display-image-command");


describe('DisplayPhotoCommands', () => {
    describe('do', () => {
        it('should call PhotoAlbum.get, DisplayImageCommand.do, and DisplayDateCommand.do', () => {
            const album = new PhotoAlbum();
            const displayDate = new DisplayDateCommand();
            const displayImage = new DisplayImageCommand();
            const displayPhoto = new DisplayPhotoCommands(album, displayDate, displayImage);
            album.get.mockImplementationOnce(() => {
               return {
                   cache_id: '1_1',
                   id: '1'
               };
            });
            displayPhoto.do();
            expect(album.get).toHaveBeenCalledTimes(1);
            expect(displayImage.do).toHaveBeenCalledTimes(1);
            expect(displayDate.do).toHaveBeenCalledTimes(1);
        });
    });
});
