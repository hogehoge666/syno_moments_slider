import DisplayPhotoCommands from '../static/display-photo-commands';
import PhotoAlbum from "../static/photo-album";
import DisplayDateCommand from "../static/display-date-command";
import DisplayImageCommand from "../static/display-image-command";
jest.mock("../static/photo-album");
jest.mock("../static/display-date-command");
jest.mock("../static/display-image-command");


describe('DisplayPhotoCommands', () => {
    let album = null;
    let displayImage = null;
    let displayDate = null;
    let displayPhoto = null;
    beforeEach(() => {
        album = new PhotoAlbum();
        displayImage = new DisplayImageCommand();
        displayDate = new DisplayDateCommand();
        displayPhoto = new DisplayPhotoCommands(album, displayImage, [[displayDate], []]);
        album.get.mockImplementationOnce(() => {
            return {
                cache_id: '1_1',
                id: '1'
            };
        });

    });

    describe('do', () => {
        it('should call PhotoAlbum.get, DisplayImageCommand.do, and DisplayDateCommand.do', () => {
            displayPhoto.do();
            expect(album.get).toHaveBeenCalledTimes(1);
            expect(displayImage.do).toHaveBeenCalledTimes(1);
            expect(displayDate.do).toHaveBeenCalledTimes(1);
        });
    });

    describe('toggleInfo', () => {
        it('should increment counter, delete date information, and not display date information anymore', () => {
            displayPhoto.toggleInfo();
            expect(displayPhoto.counter).toBe(1);
            expect(displayDate.do).toHaveBeenCalledTimes(1);
            expect(displayDate.do).toHaveBeenCalledWith(undefined);
        });

        it('should return counter to zero if counter exceeded the size of commands list', () => {
            displayPhoto.toggleInfo();
            displayPhoto.toggleInfo();
            expect(displayPhoto.counter).toBe(0);
        });
    });
});
