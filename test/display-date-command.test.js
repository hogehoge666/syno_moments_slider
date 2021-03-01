import DisplayDateCommand from "../static/display-date-command";
import SliderView from "../static/slider-view";
jest.mock("../static/slider-view");

describe('DisplayDateCommand', () => {
    describe('do', () => {
        it('should call SliderView.setDateMessage', () => {
            const sliderView = new SliderView();
            const displayDate = new DisplayDateCommand(sliderView);
            displayDate.do('test');
            expect(sliderView.setDateMessage).toHaveBeenCalledTimes(1);
        });

        it('should convert a moments date to string date for display', function () {
            const sliderView = new SliderView();
            const displayDate = new DisplayDateCommand(sliderView);
            expect(displayDate.convertMomentsTimeToStrDate(1610313594)).toBe('2021/1/10 21:19:54')
        });
    });
});