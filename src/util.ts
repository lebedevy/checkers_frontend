// credit: https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
export const toBits = (num: number | bigint): string => {
    // shifting by 0 forces the number to be treated as an unsigned integer

    if (typeof num === 'bigint') {
        return num.toString(2).padStart(96, '0');
    }

    return (num >>> 0).toString(2);
};
