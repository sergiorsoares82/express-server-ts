import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true, // use true se estiver com `"type": "module"`
            },
        ],
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    testTimeout: 60000,
    // setupFiles: ['<rootDir>/jest.setup.ts'],
};
