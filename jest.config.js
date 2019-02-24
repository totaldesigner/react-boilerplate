module.exports = {
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/global.d.ts',
    '!app/index.tsx',
    '!app/**/stories.tsx'
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/mocks/image.js',
  },
  setupFiles: ['raf/polyfill', '<rootDir>/testing/testSetup.js'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testEnvironment: '<rootDir>/testing/customizedJsdomEnv.js',
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};