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
        inputs: [],
        name: 'checkIfCanEat',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bool',
                name: 'leftAlignedRow',
                type: 'bool',
            },
            {
                internalType: 'uint32',
                name: 'previousRow',
                type: 'uint32',
            },
            {
                internalType: 'uint8',
                name: 'column',
                type: 'uint8',
            },
        ],
        name: 'getNeighbours',
        outputs: [
            {
                internalType: 'uint8',
                name: '',
                type: 'uint8',
            },
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
        inputs: [
            {
                internalType: 'uint8',
                name: 'piece',
                type: 'uint8',
            },
        ],
        name: 'isTurn',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
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
        name: 'player1',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'player2',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
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
        name: 'register',
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
