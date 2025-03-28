import {
  // checkboxGroupSchema,
  // checkboxGroupUI,
  bankAccountSchema,
  bankAccountUI,
} from 'platform/forms-system/src/js/web-component-patterns';
// import { goalTypes, goalTypeLabels } from '../constants/benefits';

/** @type {PageSchema} */
export default {
  uiSchema: {
    personalize: bankAccountUI(),
  },
  schema: {
    type: 'object',
    properties: {
      personalize: bankAccountSchema(),
    },
  },
};
