import PhotoTimer from '../static/timer'

describe('PhotoTimer', () => {

    it('should not be moving when created', () => {
        const timer = new PhotoTimer();
        expect(timer.isMoving).toBeFalsy();
        expect(timer._timerId).toBe(0);
    });

    const callback = () => {
        // console.log('callback executed');
        if (++count === 2) {
            done();
        }
    };

    it('should execute callback, set timerId, and set isMoving to true when started', (done) => {
        let count = 0;
        const timer = new PhotoTimer(() => {
            // console.log('callback executed');
            done();
        }, 0.5);
        timer.start();
        expect(timer.isMoving).toBeTruthy();
        expect(timer._timerId).not.toBe(0);
    });

    it('should not start a new timer if a timer is already started and running', (done) => {
        let count = 0;
        const timer = new PhotoTimer(() => done(), 0.5);
        timer.start();
        const timerId = timer._timerId;
        timer.start();
        expect(timer._timerId).toBe(timerId)
    });

    it('should stop when stopped', () => {
        let count = 0;
        const timer = new PhotoTimer(() => done(), 0.5);
        timer.start();
        timer.stop();
        expect(timer.isMoving).toBeFalsy();
    });

    it('should start a new timer when reset', () => {
        let count = 0;
        const timer = new PhotoTimer(() => done(), 0.5);
        timer.start();
        const timerId = timer._timerId;
        timer.reset();
        expect(timer.isMoving).toBeTruthy();
        expect(timer._timerId).not.toBe(timerId);
    });
});