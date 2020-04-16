import _ from 'lodash';

export const getSeriesValue = function (series: any, statType: string): number {
  let value = NaN;
  statType = (statType || '').toLowerCase();
  if (series) {
    if (statType === 'last_time' && series.datapoints && series.datapoints.length > 0) {
      if (_.last(series.datapoints)) {
        value = _.last(series.datapoints)[1];
      }
    } else if (statType === 'last_time_nonnull') {
      let non_null_data = series.datapoints.filter(s => s[0]);
      if (_.last(non_null_data) && _.last(non_null_data)[1]) {
        value = _.last(non_null_data)[1];
      }
    } else if (series.stats) {
      if (series.stats[statType] !== undefined) {
        value = series.stats[statType];
      }
    }
  }
  return value;
};
