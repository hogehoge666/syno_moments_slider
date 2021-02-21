import PhotoList from '../static/photo-list';

describe('PhotoList', () => {
    let photos = null;
    beforeEach(() => {
        const list = [
            'A', 'B', 'C'
        ];
        photos = new PhotoList(list);
    });

    it('should have counter value of zero when created', () => {
        expect(photos.position()).toBe(0);
    });

    it('should set its counter max size to the size of array passed to its consructor', () => {
        expect(photos.getCounterMax()).toBe(3);
    });

    it('should increment counter by one when next is called', () => {
        photos.next();
        expect(photos.position()).toBe(1);
        photos.next();
        expect(photos.position()).toBe(2);
    });

    it('should return counter to zero if it reached the max value', () => {
        photos.next();
        photos.next();
        photos.next();
        expect(photos.position()).toBe(0);
    });

    it('should decrement counter by one when prev is called', () => {
        photos.next();
        photos.prev();
        expect(photos.position()).toBe(0);
    });

    it('should return counter to max - 1 if it reaches below zero', () => {
        photos.prev();
        expect(photos.position()).toBe(2);
    });

    it('should return element in array', () => {
        expect(photos.get()).toBe('A');
        photos.next();
        expect(photos.get()).toBe('B');
    });

    it('should return counter to zero if reset', () => {
        photos.next();
        photos.reset();
        expect(photos.position()).toBe(0);
    });
});

describe('Empty PhotoList', () => {
    let emptyPhotoList = null;
    beforeEach(() => {
        emptyPhotoList = new PhotoList();
    });

    it('should have counter max value of zero if constructor is called with empty value', () => {
        expect(emptyPhotoList.getCounterMax()).toBe(0);
    });

    it('should have counter value of zero if next is called', () => {
        emptyPhotoList.next();
        expect(emptyPhotoList.position()).toBe(0);
    });

    it('should have counter value of zero if prev is called', () => {
        emptyPhotoList.prev();
        expect(emptyPhotoList.position()).toBe(0);
    });

    it('should return empty string', () => {
        expect(emptyPhotoList.get()).toBe('');
    });
});
