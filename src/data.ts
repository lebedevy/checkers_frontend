export const CONTRACT_API = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'board',
        outputs: [
            {
                internalType: 'uint96',
                name: '',
                type: 'uint96',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'position',
                type: 'uint8',
            },
        ],
        name: 'getPiece',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'increment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint8',
                name: 'from',
                type: 'uint8',
            },
            {
                internalType: 'uint8',
                name: 'to',
                type: 'uint8',
            },
        ],
        name: 'move',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'turn',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
