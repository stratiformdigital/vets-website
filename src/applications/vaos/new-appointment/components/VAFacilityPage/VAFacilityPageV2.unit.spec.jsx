import React from 'react';
import userEvent from '@testing-library/user-event';
import { expect } from 'chai';

// eslint-disable-next-line import/no-unresolved
import { mockFetch } from '@department-of-veterans-affairs/platform-testing/helpers';
import { fireEvent, waitFor } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import VAFacilityPage from './VAFacilityPageV2';
import {
  createTestStore,
  setTypeOfCare,
  renderWithStoreAndRouter,
  setTypeOfEyeCare,
} from '../../../tests/mocks/setup';
import {
  mockSchedulingConfigurations,
  mockGetCurrentPosition,
} from '../../../tests/mocks/helpers';
import { getSchedulingConfigurationMock } from '../../../tests/mocks/mock';
import { createMockFacility } from '../../../tests/mocks/data';
import {
  mockEligibilityFetches,
  mockFacilitiesFetch,
} from '../../../tests/mocks/fetch';

describe('VAOS Page: VAFacilityPage', () => {
  describe('when there are multiple facilities to choose from', () => {
    const initialState = {
      featureToggles: {
        vaOnlineSchedulingDirect: true,
      },
      user: {
        profile: {
          facilities: [
            { facilityId: '983', isCerner: false },
            { facilityId: '984', isCerner: false },
          ],
        },
      },
    };

    const facilityIds = ['983', '983GC', '983GB', '983HK', '983QA', '984'];
    const facilities = facilityIds.map((id, index) =>
      createMockFacility({
        id: id.replace('vha_', ''),
        name: `Fake facility name ${index + 1}`,
        lat: Math.random() * 90,
        long: Math.random() * 180,
        address: {
          city: `Fake city ${index + 1}`,
          state: 'FakeState',
        },
      }),
    );

    const closestFacility = facilities[2];
    closestFacility.attributes.name = 'Closest facility';
    closestFacility.attributes.lat = 39.50603012; // Dayton, OH
    closestFacility.attributes.long = -84.3164749;

    const firstAlphaFacility = facilities[3];
    firstAlphaFacility.attributes.name = 'ABC facility';

    beforeEach(() => mockFetch());

    it('should display error messaging if user denied location permissions', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Facility 983',
          }),
          createMockFacility({
            id: '983GC',
            name: 'Facility 983GC',
          }),
        ],
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
          requestEnabled: false,
        }),
        getSchedulingConfigurationMock({
          id: '983GC',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
          requestEnabled: false,
        }),
      ]);

      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      mockGetCurrentPosition({ fail: true });
      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                addressLine1: '290 Ludlow Ave',
                city: 'Cincinatti',
                stateCode: 'OH',
                zipCode: '45220',
                latitude: 39.1362562, // Cincinatti, OH
                longitude: -84.6804804,
              },
            },
          },
        },
      });
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });
      await screen.findAllByRole('radio');
      const facilitiesSelect = await screen.findByTestId('facilitiesSelect');
      // call VaSelect custom event for onChange handling
      facilitiesSelect.__events.vaSelect({
        detail: { value: 'distanceFromCurrentLocation' },
      });

      await waitFor(() => {
        expect(screen.baseElement).to.contain.text(
          'Your browser is blocked from finding your current location',
        );
      });
    });

    it('should not display show more button if < 6 locations', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities: facilities.slice(0, 5),
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GC',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GB',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983HK',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983QA',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
      ]);

      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: '323',
        limit: true,
        requestPastVisits: true,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      const store = createTestStore(initialState);
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      // Radio buttons only show up after all the data is loaded, which
      // should mean all page rendering is finished
      await screen.findAllByRole('radio');

      expect(screen.getByText(/Which VA location would you like to go to?/i)).to
        .exist;

      // Should contain radio buttons
      facilities.slice(0, 5).forEach(f => {
        expect(screen.baseElement).to.contain.text(f.attributes.name);
      });

      expect(screen.baseElement).not.to.contain.text('more location');
    });

    it('should display previous user choices when returning to page', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Fake facility name 1',
          }),
          createMockFacility({
            id: '984',
          }),
        ],
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
      ]);

      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: '323',
        limit: true,
        requestPastVisits: true,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      const store = createTestStore(initialState);
      await setTypeOfCare(store, /primary care/i);

      let screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      // Radio buttons only show up after all the data is loaded, which
      // should mean all page rendering is finished
      await screen.findAllByRole('radio');

      fireEvent.click(await screen.findByLabelText(/Fake facility name 1/i));

      await cleanup();

      screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      // Radio buttons only show up after all the data is loaded, which
      // should mean all page rendering is finished
      await screen.findAllByRole('radio');

      expect(
        await screen.findByLabelText(/Fake facility name 1/i),
      ).to.have.attribute('checked');

      expect(
        await screen.queryByText(
          /You’ve reached the limit for appointment request/i,
        ),
      ).to.be.null;
    });

    it('should show no facilities message with up to two unsupported facilities for users with address', async () => {
      mockFacilitiesFetch({
        children: true,
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Facility 983',
            lat: 39.1362562,
            long: -85.6804804,
          }),
          createMockFacility({
            id: '984',
            name: 'Facility 984',
            lat: 39.1362562,
            long: -86.6804804,
          }),
        ],
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          directEnabled: false,
          requestEnabled: false,
        }),
        getSchedulingConfigurationMock({
          id: '984',
          typeOfCareId: 'primaryCare',
          directEnabled: false,
          requestEnabled: false,
        }),
      ]);

      const state = {
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                addressLine1: '290 Ludlow Ave',
                city: 'Cincinnati',
                stateCode: 'OH',
                zipCode: '45220',
                latitude: 39.1362562,
                longitude: -84.6804804,
              },
            },
          },
        },
      };
      const store = createTestStore(state);
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      expect(
        await screen.findByText(/You can’t schedule this appointment online/i),
      ).to.exist;
      expect(screen.baseElement).to.contain.text(
        'None of your VA facilities have online scheduling for primary care.',
      );
      expect(screen.getByText(/Facility 983/i)).to.exist;
      expect(screen.baseElement).to.contain.text('Facility 983');
      expect(screen.getAllByTestId('facility-telephone')).to.exist;
      expect(screen.getByText(/Facility 984/i)).to.exist;
    });

    it('should show no facilities message with up to five unsupported facilities for users without address', async () => {
      const facilityDetails = createMockFacility({
        id: '123',
        name: 'Bozeman VA medical center',
      });
      facilityDetails.attributes.address = {
        physical: {
          zip: 'fake',
          city: 'Bozeman',
          state: 'MT',
          address1: 'fake',
          address2: null,
          address3: null,
        },
      };
      facilityDetails.attributes.phone = {
        main: '4065555858',
      };
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities: [
          facilityDetails,
          createMockFacility({
            id: '124',
            name: 'Facility 124',
          }),
          createMockFacility({
            id: '125',
            name: 'Facility 125',
          }),
          createMockFacility({
            id: '126',
            name: 'Facility 126',
          }),
          createMockFacility({
            id: '127',
            name: 'Facility 127',
          }),
          createMockFacility({
            id: '128',
            name: 'Facility 128',
          }),
        ],
      });

      const configs = ['123', '124', '125', '126', '127', '128'].map(id =>
        getSchedulingConfigurationMock({
          id,
          typeOfCareId: 'primaryCare',
          requestEnabled: false,
        }),
      );
      mockSchedulingConfigurations(configs);

      const store = createTestStore(initialState);
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      expect(
        await screen.findByText(/You can’t schedule this appointment online/i),
      ).to.exist;
      expect(screen.baseElement).to.contain.text(
        'None of your VA facilities have online scheduling for primary care.',
      );
      expect(screen.getByText(/Bozeman VA medical center/i)).to.exist;
      expect(screen.baseElement).to.contain.text('Bozeman VA medical center');
      expect(screen.getAllByTestId('facility-telephone')).to.exist;
      expect(screen.getByText(/Facility 124/i)).to.exist;
      expect(screen.getByText(/Facility 125/i)).to.exist;
      expect(screen.getByText(/Facility 126/i)).to.exist;
      expect(screen.getByText(/Facility 127/i)).to.exist;
      expect(screen.queryByText(/Facility 128/i)).not.to.exist;
    });

    it('should display an error message when facilities call fails', async () => {
      const store = createTestStore(initialState);
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      expect(
        await screen.findByText(
          /You can.t schedule an appointment online right now/i,
        ),
      ).to.exist;
    });

    // Skipping test, it breaks the unit test suite when ran in a certain order and is testing v0
    it('should show additional info link if there are unsupported facilities within 100 miles', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Facility that is enabled',
          }),
          createMockFacility({
            id: '983GC',
            name: 'Facility that is also enabled',
          }),
          createMockFacility({
            id: '984',
            name: 'Facility that is disabled',
            lat: 39.1362562,
            // tweaked longitude to be around 80 miles away
            long: -83.1804804,
            address: {
              city: 'Bozeman',
              state: 'MT',
            },
            phone: '5555555555x1234',
          }),
          createMockFacility({
            id: '984GC',
            name: 'Facility that is over 100 miles away and disabled',
            lat: 39.1362562,
            // tweaked longitude to be over 100 miles away
            long: -82.1804804,
          }),
        ],
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GC',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984',
          typeOfCareId: 'optometry',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984GC',
          typeOfCareId: 'optometry',
          requestEnabled: true,
        }),
      ]);

      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                latitude: 39.1362562,
                longitude: -84.6804804,
              },
            },
          },
        },
      });
      await setTypeOfCare(store, /primary care/i);
      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });
      expect(await screen.findByLabelText(/Facility that is enabled/i)).to.be
        .ok;
      expect(screen.getByTestId('facility-not-listed')).to.exist;
      await screen.findByText(/Facility that is disabled/i);
      expect(screen.baseElement).to.contain.text('Bozeman, MontanaMT');
      expect(screen.getByText(/80\.4 miles/i)).to.be.ok;
      expect(screen.getByTestId('facility-telephone')).to.exist;
      expect(
        screen.queryByText(
          /Facility that is over 100 miles away and disabled/i,
        ),
      ).to.be.null;
      expect(
        screen.getByRole('link', { name: /different VA location/i }),
      ).to.have.attribute('href', '/find-locations');
    });

    // Skipping test, it breaks the unit test suite when ran in a certain order and is testing v0
    it('should close additional info and re-sort unsupported facilities when sort method changes', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Facility that is enabled',
          }),
          createMockFacility({
            id: '983GC',
            name: 'Facility that is also enabled',
          }),
          createMockFacility({
            id: '984',
            name: 'Disabled facility near residential address',
            lat: 39.1362562,
            long: -83.1804804,
          }),
          createMockFacility({
            id: '984GC',
            name: 'Disabled facility near current location',
            lat: 53.2734,
            long: -7.77832031,
          }),
        ],
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GC',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984',
          typeOfCareId: 'optometry',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984GC',
          typeOfCareId: 'optometry',
          requestEnabled: true,
        }),
      ]);
      mockGetCurrentPosition();
      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                latitude: 39.1362562,
                longitude: -84.6804804,
              },
            },
          },
        },
      });
      await setTypeOfCare(store, /primary care/i);
      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });
      expect(await screen.findByLabelText(/Facility that is enabled/i)).to.be
        .ok;
      expect(screen.getByTestId('facility-not-listed')).to.exist;
      expect(
        await screen.findByText(/Disabled facility near residential address/i),
      ).to.be.ok;
      expect(screen.queryByText(/Disabled facility near current location/i)).to
        .be.null;

      const facilitiesSelect = await screen.findByTestId('facilitiesSelect');
      // call VaSelect custom event for onChange handling
      facilitiesSelect.__events.vaSelect({
        detail: { value: 'distanceFromCurrentLocation' },
      });

      expect(await screen.findByLabelText(/Facility that is enabled/i)).to.be
        .ok;

      expect(screen.getByTestId('facility-not-listed')).to.exist;
      expect(
        await screen.findByText(/Disabled facility near current location/i),
      ).to.be.ok;
      expect(screen.queryByText(/Disabled facility near residential address/i))
        .to.be.null;
    });

    // Skipping test, it breaks the unit test suite when ran in a certain order and is testing v0
    it('should display correct facilities after changing type of care', async () => {
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GB',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984',
          typeOfCareId: 'optometry',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984GB',
          typeOfCareId: 'optometry',
          requestEnabled: true,
        }),
      ]);
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'First cerner facility',
            lat: 39.1362562,
            long: -83.1804804,
          }),
          createMockFacility({ id: '983GB' }),
          createMockFacility({
            id: '984',
            name: 'Second Cerner facility',
            lat: 39.1362562,
            long: -83.1804804,
          }),
          createMockFacility({ id: '984GB' }),
        ],
      });

      const store = createTestStore(initialState);
      await setTypeOfCare(store, /primary care/i);

      let screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });
      expect(await screen.findAllByRole('radio')).to.have.length(2);

      await cleanup();

      await setTypeOfCare(store, /eye care/i);
      await setTypeOfEyeCare(store, '408'); // Optometry

      screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      expect(await screen.findAllByRole('radio')).to.have.length(2);
    });

    it('should display a list of facilities with a show more button', async () => {
      const configs = facilities.map(facility =>
        getSchedulingConfigurationMock({
          id: facility.id,
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
      );

      mockSchedulingConfigurations(configs);
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: '323',
        limit: true,
        requestPastVisits: true,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });

      const store = createTestStore({
        ...initialState,
      });
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      const buttons = await screen.findAllByRole('radio');

      await waitFor(() => {
        expect(global.document.title).to.equal(
          'Which VA location would you like to go to? | Veterans Affairs',
        );
      });

      expect(screen.getByText(/Which VA location would you like to go to?/i)).to
        .exist;

      expect(screen.baseElement).to.contain.text(
        'Select a VA facility where you’re registered that offers primary care appointments.',
      );

      expect(await screen.findByTestId('facilitiesSelect')).to.be.ok;

      // Should contain radio buttons
      facilities.slice(0, 5).forEach(f => {
        expect(screen.baseElement).to.contain.text(f.attributes.name);
      });

      // Should not show address
      expect(screen.baseElement).not.to.contain.text(
        'Facilities based on your home address',
      );

      // Should not show 6th facility
      expect(screen.baseElement).not.to.contain.text('Fake facility name 6');

      // Find show more button and fire click event
      const moreLocationsBtn = screen.getByText('Show 1 more location');
      expect(moreLocationsBtn).to.have.tagName('span');
      fireEvent.click(moreLocationsBtn);

      // Should show 6th facility
      expect(screen.baseElement).to.contain.text('Fake facility name 6');
      await waitFor(() =>
        expect(document.activeElement.id).to.equal('root_vaFacility_6'),
      );

      // Should verify that all radio buttons have the same name (508 accessibility)
      buttons.forEach(button => {
        expect(button.name).to.equal('root_vaFacility');
      });

      // Should validation message if no facility selected
      fireEvent.click(screen.getByText(/Continue/));
      expect(await screen.findByRole('alert')).to.contain.text(
        'You must provide a response',
      );
    });

    it('should sort by distance from home address if we have coordinates', async () => {
      const configs = facilities.map(facility =>
        getSchedulingConfigurationMock({
          id: facility.id,
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
      );

      mockSchedulingConfigurations(configs);
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: '323',
        limit: true,
        requestPastVisits: true,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                addressLine1: '290 Ludlow Ave',
                city: 'Cincinatti',
                stateCode: 'OH',
                zipCode: '45220',
                latitude: 39.1362562, // Cincinatti, OH
                longitude: -84.6804804,
              },
            },
          },
        },
      });
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      // Radio buttons only show up after all the data is loaded, which
      // should mean all page rendering is finished
      await screen.findAllByRole('radio');

      expect(screen.getByText(/Which VA location would you like to go to?/i)).to
        .exist;
      expect(screen.baseElement).to.contain.text('By your home address');

      // It should sort by distance, making Closest facility the first facility
      const firstRadio = screen.container.querySelector('.form-radio-buttons');
      expect(firstRadio).to.contain.text('Closest facility');

      // Providers should be sorted.
      const miles = screen.queryAllByText(/miles$/);

      expect(miles.length).to.equal(5);
      expect(() => {
        for (let i = 0; i < miles.length - 1; i++) {
          if (
            Number.parseFloat(miles[i].textContent) >
            Number.parseFloat(miles[i + 1].textContent)
          )
            throw new Error();
        }
      }).to.not.throw();
    });

    it('should sort by distance from current location when user selects dropdown option for current location', async () => {
      const configs = facilities.map(facility =>
        getSchedulingConfigurationMock({
          id: facility.id,
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
      );

      mockSchedulingConfigurations(configs);
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      mockGetCurrentPosition();
      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                addressLine1: '290 Ludlow Ave',
                city: 'Cincinatti',
                stateCode: 'OH',
                zipCode: '45220',
                latitude: 39.1362562, // Cincinatti, OH
                longitude: -84.6804804,
              },
            },
          },
        },
      });
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });
      await screen.findAllByRole('radio');

      const facilitiesSelect = await screen.findByTestId('facilitiesSelect');
      // call VaSelect custom event for onChange handling
      facilitiesSelect.__events.vaSelect({
        detail: { value: 'distanceFromCurrentLocation' },
      });

      await screen.findAllByRole('radio');
      expect(screen.baseElement).to.contain.text('By your current location');

      // Providers should be sorted.
      const miles = screen.queryAllByText(/miles$/);

      expect(miles.length).to.equal(5);

      expect(() => {
        for (let i = 0; i < miles.length - 1; i++) {
          if (
            Number.parseFloat(miles[i].textContent) >
            Number.parseFloat(miles[i + 1].textContent)
          )
            throw new Error();
        }
      }).to.not.throw();

      userEvent.click(screen.getAllByRole('radio')[0]);
      fireEvent.click(screen.getByText(/Continue/));
    });

    it('should sort alphabetically when user selects dropdown option for alphabetical', async () => {
      const configs = facilities.map(facility =>
        getSchedulingConfigurationMock({
          id: facility.id,
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
      );

      mockSchedulingConfigurations(configs);
      mockFacilitiesFetch({
        children: true,
        ids: ['983', '984'],
        facilities,
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      mockGetCurrentPosition();
      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                addressLine1: '290 Ludlow Ave',
                city: 'Cincinatti',
                stateCode: 'OH',
                zipCode: '45220',
                latitude: 39.1362562, // Cincinatti, OH
                longitude: -84.6804804,
              },
            },
          },
        },
      });
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, { store });
      await screen.findAllByRole('radio');
      // default sorted by home address
      let firstRadio = screen.container.querySelector('.form-radio-buttons');
      expect(firstRadio).to.contain.text('Closest facility');

      const facilitiesSelect = await screen.findByTestId('facilitiesSelect');
      // call VaSelect custom event for onChange handling
      facilitiesSelect.__events.vaSelect({
        detail: { value: 'alphabetical' },
      });

      await screen.findAllByRole('radio');
      expect(facilitiesSelect.value).to.equal('alphabetical');

      firstRadio = screen.container.querySelector('.form-radio-buttons');
      expect(firstRadio).to.contain.text('ABC facility');
    });

    it('should sort alphabetically when user does not have an address', async () => {
      const configs = facilities.reduce((acc, facility) => {
        if (facility.id === '983' || facility.id === '984') {
          const config = getSchedulingConfigurationMock({
            id: facility.id,
            typeOfCareId: 'primaryCare',
            directEnabled: true,
            requestEnabled: false,
          });
          return [...acc, config];
        }
        return [...acc];
      }, []);

      mockSchedulingConfigurations(configs);
      mockFacilitiesFetch({
        children: true,
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Facility 983',
            lat: 41.148179,
            long: -104.786159,
          }),
          createMockFacility({
            id: '984',
            name: 'Closest facility',
            lat: '39.7424427',
            long: '-84.2651895',
          }),
        ],
      });
      mockGetCurrentPosition();
      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {},
          },
        },
      });
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, { store });
      await screen.findAllByRole('radio');
      // default sorted by home address
      const firstRadio = screen.container.querySelector('.form-radio-buttons');
      expect(firstRadio).to.contain.text('Closest facility');
    });
  });

  describe('when there is a single supported facility', () => {
    const initialState = {
      featureToggles: {
        vaOnlineSchedulingDirect: true,
      },
      user: {
        profile: {
          facilities: [{ facilityId: '983', isCerner: false }],
        },
      },
    };

    beforeEach(() => {
      mockFetch();
    });

    it('should show facility information without form', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'San Diego VA Medical Center',
            address: {
              line: ['2360 East Pershing Boulevard'],
              city: 'San Diego',
              state: 'CA',
              postalCode: '92128',
            },
            phone: '858-779-0338',
          }),
        ],
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          requestEnabled: true,
        }),
      ]);

      const store = createTestStore(initialState);
      await setTypeOfCare(store, /primary care/i);

      const { baseElement, findByText, history } = renderWithStoreAndRouter(
        <VAFacilityPage />,
        {
          store,
        },
      );

      await findByText(
        /We found one VA facility for your primary care appointment./i,
      );

      expect(baseElement).to.contain.text('San Diego VA Medical Center');
      expect(baseElement).to.contain.text('San Diego, CaliforniaCA');

      fireEvent.click(await findByText(/Continue/));
      await waitFor(() =>
        expect(history.push.firstCall.args[0]).to.equal(
          '/new-appointment/request-date',
        ),
      );
    });

    it('should switch to multi facility view when type of care changes to one that has multiple supported facilities', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Facility 1',
          }),
          createMockFacility({
            id: '983GC',
            name: 'Facility 2',
          }),
          createMockFacility({
            id: '983GD',
            name: 'Facility 3',
          }),
        ],
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'optometry',
        limit: true,
        directPastVisits: true,
      });
      mockEligibilityFetches({
        facilityId: '983GC',
        typeOfCareId: 'ophthalmology',
        limit: true,
        directPastVisits: true,
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'optometry',
          requestEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GC',
          typeOfCareId: 'ophthalmology',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GD',
          typeOfCareId: 'ophthalmology',
          directEnabled: true,
        }),
      ]);

      const store = createTestStore(initialState);
      await setTypeOfCare(store, /eye care/i);
      await setTypeOfEyeCare(store, '408'); // Optometry

      let screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      await screen.findByText(/You can.t schedule an appointment online/i);

      await cleanup();
      await setTypeOfEyeCare(store, '407'); // Ophthalmology
      screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      expect(await screen.findByRole('radio', { name: /Facility 2/i }));
      expect(screen.getByRole('radio', { name: /Facility 3/i }));
    });

    it('should filter out facilities without a physical location', async () => {
      mockFacilitiesFetch({
        children: true,
        ids: ['983'],
        facilities: [
          createMockFacility({
            id: '983',
            name: 'Facility 1',
          }),
          createMockFacility({
            id: '984',
            name: 'Facility 2',
            address: { city: null, state: null },
          }),
          createMockFacility({
            id: '983GA',
            name: 'Facility 3',
          }),
        ],
      });
      mockEligibilityFetches({
        facilityId: '983',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      mockEligibilityFetches({
        facilityId: '984',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      mockEligibilityFetches({
        facilityId: '983GA',
        typeOfCareId: 'primaryCare',
        limit: true,
        directPastVisits: true,
      });
      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '983GA',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
      ]);

      const store = createTestStore(initialState);
      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      await screen.findAllByRole('radio');

      expect(await screen.findByRole('radio', { name: /Facility 1/i }));
      expect(screen.getByRole('radio', { name: /Facility 3/i }));
      expect(screen.queryByText(/Facility 2/i)).not.to.exist;
    });
  });

  describe('when using Drupal Source of Truth', () => {
    beforeEach(() => mockFetch());

    it('should display Cerner sites in the facility list ', async () => {
      const initialState = {
        drupalStaticData: {
          vamcEhrData: {
            loading: false,
            data: {
              ehrDataByVhaId: {
                '442': {
                  vhaId: '442',
                  vamcFacilityName: 'Cheyenne VA Medical Center',
                  vamcSystemName: 'VA Cheyenne health care',
                  ehr: 'cerner',
                },
                '552': {
                  vhaId: '552',
                  vamcFacilityName: 'Dayton VA Medical Center',
                  vamcSystemName: 'VA Dayton health care',
                  ehr: 'cerner',
                },
              },
              cernerFacilities: [
                {
                  vhaId: '442',
                  vamcFacilityName: 'Cheyenne VA Medical Center',
                  vamcSystemName: 'VA Cheyenne health care',
                  ehr: 'cerner',
                },
                {
                  vhaId: '552',
                  vamcFacilityName: 'Dayton VA Medical Center',
                  vamcSystemName: 'VA Dayton health care',
                  ehr: 'cerner',
                },
              ],
              vistaFacilities: [],
            },
          },
        },
        featureToggles: {
          vaOnlineSchedulingDirect: true,
          vaOnlineSchedulingUseDsot: true,
        },
        user: {
          profile: {
            facilities: [
              {
                facilityId: '442', // Must use real facility id when using DSOT
                isCerner: false, // Not used when using DSOT
              },
              { facilityId: '552', isCerner: false },
            ],
          },
        },
      };

      mockFacilitiesFetch({
        children: true,
        facilities: [
          createMockFacility({
            id: '983',
            name: 'First cerner facility',
            lat: 39.1362562,
            long: -83.1804804,
          }),
          createMockFacility({
            id: '984',
            name: 'Second Cerner facility',
            lat: 39.1362562,
            long: -83.1804804,
          }),
        ],
      });

      mockSchedulingConfigurations([
        getSchedulingConfigurationMock({
          id: '983',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
        getSchedulingConfigurationMock({
          id: '984',
          typeOfCareId: 'primaryCare',
          directEnabled: true,
        }),
      ]);

      const store = createTestStore({
        ...initialState,
        user: {
          ...initialState.user,
          profile: {
            ...initialState.user.profile,
            vapContactInfo: {
              residentialAddress: {
                latitude: 39.1362562,
                longitude: -84.6804804,
              },
            },
          },
        },
      });

      await setTypeOfCare(store, /primary care/i);

      const screen = renderWithStoreAndRouter(<VAFacilityPage />, {
        store,
      });

      // Make sure Cerner facilities show up
      expect(await screen.findByText(/First Cerner facility/i)).to.be.ok;
      expect(screen.getByText(/Second Cerner facility/i)).to.be.ok;

      // Make sure Cerner facilities show up only once
      expect(screen.getAllByText(/Second Cerner facility/i)).to.have.length(1);
      userEvent.click(screen.getByLabelText(/First cerner facility/i));
      userEvent.click(screen.getByText(/Continue/));
      await waitFor(() =>
        expect(screen.history.push.firstCall.args[0]).to.equal(
          '/new-appointment/how-to-schedule',
        ),
      );
    });
  });
});
