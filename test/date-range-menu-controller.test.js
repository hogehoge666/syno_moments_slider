import DateRangeMenuController from '../static/date-range-menu-controller'
import DateRangePhotoListGateway from "../static/date-range-photo-list-gateway";
import HomeMenuView from "../static/home-menu-view";
import DateRangeMenuView from "../static/date-range-menu-view"
jest.mock("../static/date-range-photo-list-gateway");
jest.mock("../static/home-menu-view");
jest.mock("../static/date-range-menu-view");


describe('DateRangeMenuController', () => {
    let controller = null;
    let homeView = null;
    let dateRangeMenuView = null;
    let dateRangePhotoListGateway = null;
    beforeEach(() => {
        HomeMenuView.mockClear();
        DateRangeMenuView.mockClear();
        DateRangePhotoListGateway.mockClear();
        homeView = new HomeMenuView();
        dateRangeMenuView = new DateRangeMenuView();
        dateRangePhotoListGateway = new DateRangePhotoListGateway();
        controller = new DateRangeMenuController(homeView, dateRangeMenuView, dateRangePhotoListGateway);
    });

    describe('getPhotoList', () => {
        it('should call DateRangePhotoListGateway.find once, HomeMenuView.setStatusMessage twice, and homeView.setStartButtonStatus once', () => {
            dateRangePhotoListGateway.find.mockImplementationOnce(() => Promise.resolve([]));
            return controller.getPhotoList('2021-1-1', '2021-1-2')
                .then((list) => {
                    expect(dateRangePhotoListGateway.find).toHaveBeenCalledTimes(1);
                    expect(homeView.setStatusMessage).toHaveBeenCalledTimes(2);
                    expect(homeView.setStartButtonStatus).toHaveBeenCalledTimes(1);
                })
        });

        it('should call HomeMenuView.setStatusMessage once if input date validation fails', () => {
            return controller.getPhotoList('2021-1-1', '')
                .then((list) => {
                    expect(dateRangePhotoListGateway.find).toHaveBeenCalledTimes(0);
                    expect(homeView.setStatusMessage).toHaveBeenCalledTimes(1);
                    expect(homeView.setStartButtonStatus).toHaveBeenCalledTimes(0);
                });
        });
    });

    describe('validateDateInput', () => {
        it('should return false if either start or end date is empty', () => {
            const result1 = controller.validateDateInput('2021-1-1', '')
            expect(result1.success).toBeFalsy();
            const result2 = controller.validateDateInput('', '2021-1-1');
            expect(result2.success).toBeFalsy();
        });

        it('should return false if start date is later than end date', () => {
            const result = controller.validateDateInput('2021-1-2', '2021-1-1');
            expect(result.success).toBeFalsy();
        });

        it('should return true if start and end date are received', () => {
            const result = controller.validateDateInput('2021-1-1', '2021-1-2');
        });

    });
});