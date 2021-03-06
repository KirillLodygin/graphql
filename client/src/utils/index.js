export const utils = {
  ucFirst: str => {
    if (!str) return str;
    const arr = str.split(' ');
    return arr
      .map(item => (item === '' ? item : item[0].toUpperCase() + item.slice(1)))
      .join(' ');
  },

  onlyNum: arg => {
    if (!arg) return arg;
    const arr = String(arg).split(' ');
    const reg = new RegExp('^\\d+$');
    return arr.filter(item => reg.test(item)).join(' ');
  },

  rateInInterval: arg => {
    if (arg > 10) return 10;
    if (arg < -10) return -10;
    return arg;
  },
};
