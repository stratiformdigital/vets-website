import path from 'path';

import testForm from 'platform/testing/e2e/cypress/support/form-tester';
import { createTestConfig } from 'platform/testing/e2e/cypress/support/form-tester/utilities';
// import mockSubmit from './fixtures/data/mocks/application-submit.json';

import formConfig from '../config/form';

const mockManifest = {
  appName: '35% exemption of the routine reporting',
  entryFile: './app-entry.jsx',
  entryName: '10216-edu-benefits',
  productId: 'db0db964-89ef-4e80-a469-499b7db330cd',
  rootUrl: '/school-administrators/35-percent-exemption',
};

const testConfig = createTestConfig(
  {
    dataPrefix: 'data',

    dataDir: path.join(__dirname, 'fixtures', 'data'),

    dataSets: ['maximal-test.json'],

    pageHooks: {
      introduction: ({ afterHook }) => {
        afterHook(() => {
          // cy.get('a.va-link--primary')
          cy.get('[class="schemaform-start-button"]')
            .first()
            .click();
        });
      },
      '/school-administrators/35-percent-exemption/review-and-submit': ({
        afterHook,
      }) => {
        afterHook(() => {
          // cy.get('@testKey').then(testKey => {
          cy.get('[id="inputField"]', { timeout: 10000 }).type('John Doe', {
            force: true,
          });
          cy.get('[id="checkbox-element"]').check({ force: true });

          cy.findAllByText(/submit/i, { selector: 'button' })
            .first()
            .click();
        });
      },
    },

    setupPerTest: () => {
      cy.intercept('POST', formConfig.submitUrl);
    },
    skip: Cypress.env('CI'),
  },
  mockManifest,
  formConfig,
);

testForm(testConfig);
