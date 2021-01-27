export const groupBy = <T>(
  arr: T[],
  groupingFn: (el: T) => T[keyof T],
): any => {
  return arr.reduce((acc: any, el: T) => {
    const groupingKey = groupingFn(el);

    acc[groupingKey] = acc[groupingKey] ? [...acc[groupingKey], el] : [el];
    return acc;
  }, {});
};
