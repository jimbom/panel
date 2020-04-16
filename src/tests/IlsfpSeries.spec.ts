import { IlssppLeds } from '../app/ilsspp/index';

describe("Test Leds", () => {
    it("testLed", () => {
        let leds = new IlssppLeds();
        expect(leds.testLed('normal',[])).toBe(-1);
    });
});

