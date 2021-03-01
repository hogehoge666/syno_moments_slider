import DisplayImageCommand from "../static/display-image-command";
import SliderView from "../static/slider-view";
import PhotoGateway from "../static/photo-gateway";
jest.mock("../static/slider-view");
jest.mock("../static/photo-gateway");

describe('DisplayImageCommand', () => {
    let sliderView = null;
    let photoGateway = null;
    let displayImage = null;
    beforeEach(() => {
        SliderView.mockClear();
        PhotoGateway.mockClear();
        sliderView = new SliderView();
        photoGateway = new PhotoGateway();
        displayImage = new DisplayImageCommand(sliderView, photoGateway);
        photoGateway.findByCacheId.mockImplementationOnce(() => Promise.resolve());
        displayImage.convertBlobToBase64 = jest.fn().mockImplementationOnce(() => Promise.resolve());
    });

    describe('do', () => {
        it('should call PhotoGateway.findByCacheId and SliderView.setImage', () => {
            displayImage.do('test1', 'test2');
            expect(photoGateway.findByCacheId).toHaveBeenCalledTimes(1);
            expect(photoGateway.findByCacheId).toHaveBeenCalledWith('test1', 'test2');
            // expect(displayImage.convertBlobToBase64).toHaveBeenCalledTimes(1);
            expect(SliderView.mock.instances[0].setImage).toHaveBeenCalledTimes(1);
        });

        it('should convert blob to Base64 format', () => {
            // Todo: need to an unit test
        });
    });
});