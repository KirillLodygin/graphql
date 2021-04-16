export const utils = {
    ucFirst: (str) => {
        if (!str) return str;
        let arr = str.split(' ');
        return arr.map(item => (item === "") ? item : item[0].toUpperCase() + item.slice(1)).join(' ');
    },

    ucFirstGenre: (str) => {
        if (!str) return str;
        let arr = str.split(', ');
        return arr.map(item => (item === "") ? item : item[0].toUpperCase() + item.slice(1)).join(', ');
    },

    onlyNum: (arg) => {
        if (!arg) return arg;
        let arr = String(arg).split(' ');
        let reg = new RegExp('^\\d+$');
        return arr.filter(item => reg.test(item)).join(' ');
    },

    strToArr: (str) => str.split(', ')
};