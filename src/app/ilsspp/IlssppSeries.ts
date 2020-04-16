///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import TimeSeries from "app/core/time_series2";
import _ from "lodash";
import { getSeriesValue } from "./IlssppUtils";
import { IIlssppSeries } from "./Ilsspp.interface";

class IlssppSeries implements IIlssppSeries {
    public name: string;
    public value = NaN;

    constructor(seriesData: any) {
        let series = new TimeSeries({
            alias: seriesData.target,
            datapoints: seriesData.datapoints || []
        });
        series.flotpairs = series.getFlotPairs("connected");
        this.name = seriesData.target;
        this.value = getSeriesValue(series, 'current');
    }
}

export {
    IlssppSeries
};
