import DisplayImageCommand from "../static/display-image-command";
import SliderView from "../static/slider-view";
import PhotoGateway from "../static/photo-gateway";
import BlobToBase64Converter from "../static/blob-to-base64-converter";
jest.mock("../static/slider-view");
jest.mock("../static/photo-gateway");
jest.mock("../static/blob-to-base64-converter");

describe('DisplayImageCommand', () => {
    describe('do', () => {
        it('should call PhotoGateway.findByCacheId, BlobToImageConverter.convert, and SliderView.setImage', () => {
            SliderView.mockClear();
            PhotoGateway.mockClear();
            BlobToBase64Converter.mockClear();
            const sliderView = new SliderView();
            const photoGateway = new PhotoGateway();
            const displayImage = new DisplayImageCommand(sliderView, photoGateway);
            const blobToImage = new BlobToBase64Converter();
            photoGateway.findByCacheId.mockImplementationOnce(() => Promise.resolve('1'));
            BlobToBase64Converter.convert.mockImplementationOnce(() => Promise.resolve('2'));
            return displayImage.do({cache_key: 'test1', id: 'test2'})
                .then(() => {
                    expect(photoGateway.findByCacheId).toHaveBeenCalledTimes(1);
                    expect(photoGateway.findByCacheId).toHaveBeenCalledWith('test1', 'test2');
                    expect(BlobToBase64Converter.convert).toHaveBeenCalledTimes(1);
                    expect(SliderView.mock.instances[0].setImage).toHaveBeenCalledTimes(1);
                })
        });
    });
});