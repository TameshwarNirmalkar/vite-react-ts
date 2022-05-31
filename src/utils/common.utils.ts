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
    cost: groups[item].reduce((a: number, b: any) => a + b.cost, 0),
    revenue: groups[item].reduce((a: number, b: any) => a + b.revenue, 0),
  }));
};

export const dataBetweenTwoDates = (list: Array<any>, fromDate: string, toDate: string) => {
  const fromDt = new Date(fromDate).getTime();
  const toDt = new Date(toDate).getTime();
  return list.filter(
    (el: any) => new Date(el.date).getTime() >= fromDt && new Date(el.date).getTime() <= toDt
  );
};

export const filterDataByPractitionerId = (list: Array<any>, id: number) => {
  return list.filter((el: { practitioner_id: number }) => el.practitioner_id === id);
};

export const sortByDate = (arr: any) =>
  arr.sort((a: { date: string }, b: { date: string }) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return +new Date(a.date) - +new Date(b.date);
  });
