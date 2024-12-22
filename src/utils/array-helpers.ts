export function zip<T1, T2, K>(a: Array<T1>, b: Array<T2>, func: (a: T1, b: T2) => K): K[] {
    const min = a.length > b.length ? b.length : a.length;
    const result = new Array<K>(min);
    for (let i = 0; i < min; i++) {
        result[i] = func(a[i], b[i]);
    }
    return result;
}

export function chunk<T>(arr: Array<T>, size: number): Array<Array<T>> {
    let i = 0;
    const chunks: Array<T>[] = [];

    while (i < arr.length) {
        chunks.push(arr.slice(i, i + size));
        i += size;
    }

    return chunks;
}

export function windows<T>(arr: Array<T>, size: number): Array<Array<T>> {
    let i = 0;
    const windows: Array<Array<T>> = [];

    while (i + size <= arr.length) {
        windows.push(arr.slice(i, i + size));
        i++;
    }

    return windows;
}
