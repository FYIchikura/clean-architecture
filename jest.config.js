module.exports = {
  preset: '@shelf/jest-mongodb',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/test'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/test/**',
    '!**/config/**'
  ],

  transform: {
    '.+\\.ts$': 'ts-jest'
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  }
}
