export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@supabase/supabase-js$': '<rootDir>/src/__mocks__/@supabase/supabase-js.ts',
    '^../lib/supabase$': '<rootDir>/src/__mocks__/supabase.ts',
    '^../../lib/supabase$': '<rootDir>/src/__mocks__/supabase.ts'
  },
  moduleDirectories: ['node_modules', 'src'],
  testMatch: [
    '**/__tests__/**/*.test.ts?(x)',
    '**/components/**/*.test.ts?(x)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
      useESM: true
    }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@supabase)'
  ],
  globals: {
    'import.meta': {
      env: {
        VITE_SUPABASE_URL: 'https://example.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'test-anon-key'
      }
    }
  }
};