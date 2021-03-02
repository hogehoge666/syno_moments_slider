import DisplayDateCommand from "../static/display-date-command";
import SliderView from "../static/slider-view";
jest.mock("../static/slider-view");

describe('DisplayDateCommand', () => {
    describe('do', () => {
        let sliderView = null;
        let displayDate = null;
        beforeEach(() => {
            sliderView = new SliderView();
            displayDate = new DisplayDateCommand(sliderView);
        });

        it('should call SliderView.setDateMessage and set date when photo time is provided', () => {
            return displayDate.do({time: 1610313594})
                .then(() => {
                    expect(sliderView.setDateMessage).toHaveBeenCalledTimes(1);
                    expect(sliderView.setDateMessage).toHaveBeenCalledWith('2021/1/10 21:19:54');
                });
        });

        it('should call SliderView.setDateMessage and set empty date when no photo time is provided', () => {
            return displayDate.do()
                .then(() => {
                    expect(sliderView.setDateMessage).toHaveBeenCalledTimes(1);
                    expect(sliderView.setDateMessage).toHaveBeenCalledWith('');
                });

        });

        it('should convert a moments date to string date for display', function () {
            expect(displayDate.convertMomentsTimeToStrDate(1610313594)).toBe('2021/1/10 21:19:54');
            expect(displayDate.convertMomentsTimeToStrDate(1614646807)).toBe('2021/3/2 01:00:07');
        });
    });
});