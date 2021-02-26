import MomentsPhotoListGetter from '../../static/moments/photo-list-getter'
import MomentsPhotoGW from "../../static/moments/gateway";
import HomeView from "../../static/home-view";
jest.mock("../../static/moments/gateway");
jest.mock("../../static/home-view");


describe('PhotoListGetter', () => {
    let getter = null;
    let gw = null
    let homeView = null;
    beforeEach(() => {
        MomentsPhotoGW.mockClear();
        HomeView.mockClear();
        gw = new MomentsPhotoGW();
        homeView = new HomeView();
        getter = new MomentsPhotoListGetter(gw, homeView);
    });

    describe('getPhotoList', () => {
        it('should call MomentsPhotoGW.getPhotoList once, HomeView.setStatusMessage twice, and homeView.setStartButtonStatus once', () => {
            gw.login.mockImplementationOnce(() => Promise.resolve());
            gw.getPhotoList.mockImplementationOnce(() => Promise.resolve([]));
            return getter.getPhotoList('2021-1-1', '2021-1-2')
                .then((list) => {
                    expect(gw.getPhotoList).toHaveBeenCalledTimes(1);
                    expect(homeView.setStatusMessage).toHaveBeenCalledTimes(2);
                    expect(homeView.setStartButtonStatus).toHaveBeenCalledTimes(1);
                })
        });

        it('should call HomeView.setStatusMessage once if input date validation fails', () => {
            return getter.getPhotoList('2021-1-1', '')
                .then((list) => {
                    expect(gw.getPhotoList).toHaveBeenCalledTimes(0);
                    expect(homeView.setStatusMessage).toHaveBeenCalledTimes(1);
                    expect(homeView.setStartButtonStatus).toHaveBeenCalledTimes(0);
                });
        });
    });

    describe('validateDateInput', () => {
        it('should return false if either start or end date is empty', () => {
            const result1 = getter.validateDateInput('2021-1-1', '')
            expect(result1.success).toBeFalsy();
            const result2 = getter.validateDateInput('', '2021-1-1');
            expect(result2.success).toBeFalsy();
        });

        it('should return false if start date is later than end date', () => {
            const result = getter.validateDateInput('2021-1-2', '2021-1-1');
            expect(result.success).toBeFalsy();
        });

        it('should return true if start and end date are received', () => {
            const result = getter.validateDateInput('2021-1-1', '2021-1-2');
        });

    });
});