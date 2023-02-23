// credit: https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
export const toBits = (num: number | bigint): string => {
    // shifting by 0 forces the number to be treated as an unsigned integer

    if (typeof num === 'bigint') {
        return num.toString(2).padStart(96, '0');
    }

    return (num >>> 0).toString(2);
};

export const printBoard = (board: string) => {
    const b = BigInt('0b' + board);
    for (let i = 0; i < 32; i++) {
        console.log(`${i} ${((b >> BigInt(i * 3)) & BigInt(7)).toString(2)}`);
    }
};

export const updateBoard = (position: number, piece: string, board: string) => {
    const p = position * 3;
    return board.substring(0, p) + piece + board.substring(p + 3);
};

export const buildBoard = (): string => {
    // Positions
    // 001 (1) first player, non king piece
    // 010 (2) second player, non king piece
    // 1XX (5/6) first/second player, kind piece

    let board = BigInt(2);

    // player has 12 pieces; we started with the first one
    // for every piece, shift bits by 3, and add the player piece in the new position
    for (let i = 1; i < 32; i++) {
        board = board << BigInt(3);

        if (i < 12) board += BigInt(2);
        if (i >= 32 - 12) board += BigInt(1);
    }

    return toBits(board);
};
