export const MONTH_NAMES: any = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const createDateGroups = (data: Array<any>) => {
  return data.reduce((groups, item) => {
    const dateString = new Date(item.date);
    const getMonthFromDateString = dateString.getMonth() + 1;
    if (!groups[getMonthFromDateString]) {
      groups[getMonthFromDateString] = [];
    }
    groups[getMonthFromDateString].push(item);
    return groups;
  }, {});
};

export const groupArrays = (groups: any) => {
  return Object.keys(groups).map((item: any) => ({
    item,
    monthName: MONTH_NAMES[item],
    list: groups[item],
  }));
};
