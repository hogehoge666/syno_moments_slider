import SelectMenuController from "../static/select-menu-controller";

describe('SelectMenuController', () => {
    
    describe('getPhotoList', () => {
        it('should thrown a Not Implemented error when called', () => {
            const selectMenuController = new SelectMenuController();
            expect(() => selectMenuController.getPhotoList()).toThrow('Not Implemented.')
        });
    });
    
});