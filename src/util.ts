// credit: https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
export const toBits = (num: number | bigint, padStart = 96): string => {
    // shifting by 0 forces the number to be treated as an unsigned integer

    if (typeof num === 'bigint') {
        return num.toString(2).padStart(padStart, '0');
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
    // 1XX (5/6) first/second player, king piece

    let board = BigInt(2);

    // player has 12 pieces; we started with the first one
    // for every piece, shift bits by 3, and add the player piece in the new position
    for (let i = 1; i < 32; i++) {
        board = board << BigInt(3);

        // to add a piece in specific position, specify position as 31 - position;
        // ie to add player 1 to position 13:
        // if (i === 31 - 13) board += BigInt(1);

        if (i < 12) board += BigInt(2);
        if (i >= 32 - 12) board += BigInt(1);
    }

    return toBits(board);
};

// Gets the piece at position from a binary string
export const getPiece = (index: number, board: string): string => {
    return toBits((BigInt(`0b${board}`) >> BigInt(index * 3)) & BigInt(7), 3);
};

export const getActualIndex = (index: number) => {
    const previousRows = Math.floor(index / 4) * 4;
    return index + (index % 4) + (Math.floor(index / 4) % 2 ^ 1) + previousRows;
};

export const reverseIndex = (index: number) => {
    const prevWhiteCells = Math.floor(index / 8) * 4;
    return index - prevWhiteCells - (Math.floor(index / 8) % 2 ^ 1) - Math.floor((index % 8) / 2);
};
