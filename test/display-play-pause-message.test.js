import DisplayPlayPauseMessage from "../static/display-play-pause-message";
import SliderView from "../static/slider-view";
jest.mock("../static/slider-view");

describe('DisplayPlayPauseMessage', () => {
    describe('do', () => {
        it('should call SliderView.setPlayPauseMessage', () => {
            const sliderView = new SliderView();
            const displayPlayPauseMessage = new DisplayPlayPauseMessage(sliderView);
            displayPlayPauseMessage.do('test');
            expect(sliderView.setPlayPauseMessage).toHaveBeenCalledTimes(1);
            expect(sliderView.setPlayPauseMessage).toHaveBeenCalledWith('test');
        });
    });
});