import { recordEvent } from '@department-of-veterans-affairs/platform-monitoring/exports';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import InfoAlert from '../../components/InfoAlert';
import RequestAppointmentLayout from '../../components/RequestAppointmentLayout';
import { FETCH_STATUS, GA_PREFIX } from '../../utils/constants';
import { scrollAndFocus } from '../../utils/scrollAndFocus';
import { startNewAppointmentFlow } from '../redux/actions';
import { fetchPendingAppointments } from '../../redux/actions';
import { getRequestedAppointmentListInfo } from '../../redux/selectors';
import NoAppointments from './NoAppointments';

export default function RequestedAppointmentsList({ hasTypeChanged }) {
  const {
    pendingAppointments,
    pendingStatus,
    showScheduleButton,
  } = useSelector(
    state => getRequestedAppointmentListInfo(state),
    shallowEqual,
  );

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (pendingStatus === FETCH_STATUS.notStarted) {
        dispatch(fetchPendingAppointments());
      } else if (hasTypeChanged && pendingStatus === FETCH_STATUS.succeeded) {
        scrollAndFocus('#type-dropdown');
      } else if (hasTypeChanged && pendingStatus === FETCH_STATUS.failed) {
        scrollAndFocus('h3');
      }
    },
    [fetchPendingAppointments, pendingStatus, hasTypeChanged],
  );

  if (
    pendingStatus === FETCH_STATUS.loading ||
    pendingStatus === FETCH_STATUS.notStarted
  ) {
    return (
      <div className="vads-u-margin-y--8">
        <va-loading-indicator
          set-focus={hasTypeChanged}
          message="Loading your appointment requests..."
        />
      </div>
    );
  }

  if (pendingStatus === FETCH_STATUS.failed) {
    return (
      <InfoAlert
        status="error"
        headline="We’re sorry. We’ve run into a problem"
      >
        We’re having trouble getting your appointment requests. Please try again
        later.
      </InfoAlert>
    );
  }
  const paragraphText =
    'Appointments that you request will show here until staff review and schedule them.';

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {hasTypeChanged && 'Showing requested appointments'}
      </div>

      {pendingAppointments?.length > 0 && (
        <>
          <p className="vaos-hide-for-print">{paragraphText}</p>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ul
            className="vads-u-padding-left--0"
            data-cy="requested-appointment-list"
          >
            {pendingAppointments.map((appt, index) => {
              return (
                <RequestAppointmentLayout key={index} appointment={appt} />
              );
            })}
          </ul>
        </>
      )}
      {pendingAppointments?.length === 0 && (
        <div className="vads-u-background-color--gray-lightest vads-u-padding--2 vads-u-margin-y--3">
          <NoAppointments
            description="appointment requests"
            showAdditionalRequestDescription
            showScheduleButton={showScheduleButton}
            startNewAppointmentFlow={() => {
              recordEvent({
                event: `${GA_PREFIX}-schedule-appointment-button-clicked`,
              });
              startNewAppointmentFlow();
            }}
          />
        </div>
      )}
    </>
  );
}

RequestedAppointmentsList.propTypes = {
  hasTypeChanged: PropTypes.bool,
};
