// In a real app this would not be imported directly; instead the schema you
// imported above would import and use these common definitions:
import commonDefinitions from 'vets-json-schema/dist/definitions.json';

import footerContent from 'platform/forms/components/FormFooter';
// import environment from '@department-of-veterans-affairs/platform-utilities/environment';
import getHelp from '../components/GetFormHelp';
import PreSubmitInfo from '../containers/PreSubmitInfo';
import { submitHandler } from '../utils/helpers';

import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage'; // eslint-disable-line import/no-cycle
import ConfirmationPage from '../containers/ConfirmationPage';

// pages
import goals from '../pages/goals';
import personalize from '../pages/personalize';
import disabilityRating from '../pages/disabilityRating';
// import militaryService from '../pages/militaryService';
// import militaryBranch from '../pages/militaryBranch';
// import militaryServiceTimeServed from '../pages/militaryServiceTimeServed';
// import militaryServiceCompleted from '../pages/militaryServiceCompleted';
// import separation from '../pages/separation';
// import characterOfDischarge from '../pages/characterOfDischarge';

const { fullName, ssn, date, dateRange, usaPhone } = commonDefinitions;

export const isOnReviewPage = currentLocation => {
  return currentLocation?.pathname.includes('/review-and-submit');
};

export const isOnConfirmationPage = currentLocation => {
  return currentLocation?.pathname.includes('/confirmation');
};

export const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  submit: submitHandler,
  trackingPrefix: 'discover-your-benefits-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  v3SegmentedProgressBar: true,
  stepLabels: 'Goals;Personalize;Disability;Review',
  formId: 'T-QSTNR',
  customText: {
    submitButtonText: 'Submit',
  },
  preSubmitInfo: {
    CustomComponent: PreSubmitInfo,
    required: true,
    field: 'privacyAgreementAccepted',
  },
  saveInProgress: {
    messages: {
      inProgress: 'Your benefits questionnaire is in progress.',
      expired:
        'Your saved benefits questionnaire has expired. If you want to continue, please start a new questionnaire.',
      saved: 'Your benefits questionnaire has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  title: 'Discover your benefits',
  defaultDefinitions: {
    fullName,
    ssn,
    date,
    dateRange,
    usaPhone,
  },
  chapters: {
    chapter1: {
      title: 'Goals',
      pages: {
        goals: {
          path: 'goals',
          title: 'Goals',
          uiSchema: goals.uiSchema,
          schema: goals.schema,
        },
      },
    },
    chapter2: {
      title: 'Personalize',
      pages: {
        personalize: {
          path: 'personalize',
          title: 'Personalize',
          uiSchema: personalize.uiSchema,
          schema: personalize.schema,
        },
      },
    },
    chapter3: {
      title: 'Disability',
      pages: {
        disabilityRating: {
          path: 'disability',
          title: 'Disability Rating',
          uiSchema: disabilityRating.uiSchema,
          schema: disabilityRating.schema,
        },
      },
    },
  },
  footerContent,
  getHelp,
};

export default formConfig;
