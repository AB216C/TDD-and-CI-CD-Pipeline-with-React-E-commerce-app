
## To Install and run the application
npx create-vite E-commerce-app --template react-ts,
cd E-commerce-app,
npm install @reduxjs/toolkit,
npm install react-redux,
npm install @tanstack/react-query,
npm install axios,
npm run dev,

Brwose: http://localhost:5173

TDD, CI/CD pipeline

STEPS TO FOLLOW: 

1. create .github/workflows with main.yaml file

2. Implementing TDD-Unit tests-Working on Running components tests

3. Implementing CI(COMPLETED)

4. Implementing CD using Vercel


#No need for package installation for to run CI test, only yaml file needed.

# For Unit testing and TDD

npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
npm install --save-dev @testing-library/user-event @babel/preset-env @babel/preset-react
npm install --save-dev ts-jest @types/jest @types/react-redux
npm install --save-dev vitest

# Adding Testing Environment

// src/setupTests.ts
import '@testing-library/jest-dom';

