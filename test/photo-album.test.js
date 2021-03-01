import PhotoAlbum from '../static/photo-album';

describe('PhotoAlbum', () => {
    let album = null;
    beforeEach(() => {
        const list = [
            'A', 'B', 'C'
        ];
        album = new PhotoAlbum(list);
    });

    it('should have counter value of zero when created', () => {
        expect(album.position()).toBe(0);
    });

    it('should set its size to the size of array passed to its constructor', () => {
        expect(album.getSize()).toBe(3);
    });

    it('should increment counter by one when next is called', () => {
        album.next();
        expect(album.position()).toBe(1);
        album.next();
        expect(album.position()).toBe(2);
    });

    it('should return counter to zero if it reached the max value', () => {
        album.next();
        album.next();
        album.next();
        expect(album.position()).toBe(0);
    });

    it('should decrement counter by one when prev is called', () => {
        album.next();
        album.prev();
        expect(album.position()).toBe(0);
    });

    it('should return counter to its size - 1 if it reaches below zero', () => {
        album.prev();
        expect(album.position()).toBe(2);
    });

    it('should return element in array', () => {
        expect(album.get()).toBe('A');
        album.next();
        expect(album.get()).toBe('B');
    });

    it('should return counter to zero if reset', () => {
        album.next();
        album.reset();
        expect(album.position()).toBe(0);
    });
});

describe('Empty PhotoAlbum', () => {
    let emptyAlbum = null;
    beforeEach(() => {
        emptyAlbum = new PhotoAlbum();
    });

    it('should be size of zero if constructor is called with empty value', () => {
        expect(emptyAlbum.getSize()).toBe(0);
    });

    it('should have counter value of zero if next is called', () => {
        emptyAlbum.next();
        expect(emptyAlbum.position()).toBe(0);
    });

    it('should have counter value of zero if prev is called', () => {
        emptyAlbum.prev();
        expect(emptyAlbum.position()).toBe(0);
    });

    it('should return empty string', () => {
        expect(emptyAlbum.get()).toBe('');
    });
});
