import {IIlssppSeries} from './index';

enum LedColors {
    Off = 'led-off',
    Green = 'led-green',
    Yellow = 'led-yellow',
    Red = 'led-red'
}

interface ILedConfig {
    func: LedFunction;
    params: string[];
    colourLow: LedColors;
    colourHigh: LedColors;
    currentValue: LedColors;
}

type LedFunction = (
    (ledConfig: ILedConfig) => void
);

export class IlssppLeds {
    public ledsConfig: Object;
    public ledData: IIlssppSeries[] = [];
    constructor() {
        this.ledsConfig = {
            'led1':   {func: this.regularLed,  params: ['normal'],   colourLow: LedColors.Off,    colourHigh: LedColors.Green,    currentValue: LedColors.Off},
            'led2':   {func: this.regularLed,  params: ['alarm'],    colourLow: LedColors.Off,    colourHigh: LedColors.Red,      currentValue: LedColors.Off},
            'led3':   {func: this.regularLed,  params: ['warning'],  colourLow: LedColors.Off,    colourHigh: LedColors.Yellow,   currentValue: LedColors.Off}
         };
    }

    public testLed(led: string, ledData: IIlssppSeries[]): number {
        if (ledData.length === 0){
            console.error('setLeds: No data in ledData');
            return -1;
        }
        this.ledData = ledData;

        let ledConfig = this.ledsConfig[led];
        let that = this;
        ledConfig.func.bind(that)(ledConfig);

        if (ledConfig.currentValue === LedColors.Off) {
            return 0;
        }
        return 1;
    }

    private regularLed(ledConfig: ILedConfig) {
        let found = this.ledData.find(element => element.name.endsWith(ledConfig.params[0]));
        if (found !== undefined) {
            if (found.value === 1) {
                ledConfig.currentValue = ledConfig.colourHigh;
            } else if (found.value === 0) {
                ledConfig.currentValue = ledConfig.colourLow;
            } else {
                ledConfig.currentValue = LedColors.Off;
            }
        } else {
            console.error('Did not find ' + ledConfig.params[0]);
            ledConfig.currentValue = LedColors.Off;
        }
    }
}
