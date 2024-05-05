import type { Config } from 'jest';

const config: Config = {
// ...  
  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['./test-env.ts'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./setup.js']
// ...
  };
  
export default config;