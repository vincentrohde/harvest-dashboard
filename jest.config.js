module.exports = {
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
        "@/(.*)$": "<rootDir>/src/$1"
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!variables/.*)"
    ]
};
