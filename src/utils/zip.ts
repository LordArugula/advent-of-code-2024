export function zip<T1, T2, K>(a: Array<T1>, b: Array<T2>, func: (a: T1, b: T2) => K): K[] {
    const min = a.length > b.length ? b.length : a.length;
    const result = new Array<K>(min);
    for (let i = 0; i < min; i++) {
        result[i] = func(a[i], b[i]);
    }
    return result;
}
