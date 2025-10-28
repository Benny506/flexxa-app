import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import reusable components
import AttendanceTimer from '../../../components/event/AttendanceTimer';
import EventDetailsContent from '../../../components/event/EventDetailsContent';
import EventDetailsHeader from '../../../components/event/EventDetailsHeader';

// Import modals
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useSelector } from 'react-redux';
import ActionButtons from '../../../components/event/ActionButtons';
import Loading from '../../../components/loader';
import AvailabilityUpdatedModal from '../../../components/modals/AvailabilityUpdatedModal';
import ClockInConfirmationModal from '../../../components/modals/ClockInConfirmationModal';
import ClockInSuccessModal from '../../../components/modals/ClockInSuccessModal';
import ClockOutModal from '../../../components/modals/ClockOutModal';
import ClockOutSuccessModal from '../../../components/modals/ClockOutSuccessModal';
import ConfirmAcceptanceModal from '../../../components/modals/ConfirmAcceptanceModal';
import DeclineRequestModal from '../../../components/modals/DeclineRequestModal';
import RequestDeclinedModal from '../../../components/modals/RequestDeclinedModal';
import ReviewModal from '../../../components/modals/ReviewModal';
import UpdateAvailabilityModal from '../../../components/modals/UpdateAvailabilityModal';
import useApiReqs from '../../../hooks/useApiReqs';
import { getUserDetailsState } from '../../../redux/slices/userDetailsSlice';

//status interpretation
//null -> you can request to participate
//pending -> awaiting your request approval
//unavailable -> you've been invited but not accepted yet
//available -> you're in. Either by accepting an invite are having your request approved

// Format function (moved from AttendanceTimer.js)
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export default function EventDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const event = typeof params?.event === 'string' ? JSON.parse(params?.event) : params?.event;

  const { getEventAttendees, acceptEventRequest, rejectEventRequest, requestToParticipate } = useApiReqs()

  const user = useSelector(state => getUserDetailsState(state).user)
  const flexrRequests = useSelector(state => getUserDetailsState(state).flexrRequests)
  const myRequests = useSelector(state => getUserDetailsState(state).myRequests)

  // State management
  const [status, setStatus] = useState(null);
  const [clockedInAt, setClockedInAt] = useState(null);
  const [clockedOutAt, setClockedOutAt] = useState(null)
  const [showDetails, setShowDetails] = useState(true);
  const [remainingTime, setRemainingTime] = useState(event?.duration);
  const [startTime, setStartTime] = useState(null);
  const [attendees, setAttendees] = useState([])

  // Modal states
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [showClockOutSuccessModal, setShowClockOutSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showUpdateAvailabilityModal, setShowUpdateAvailabilityModal] = useState(false);
  const [showAvailabilityUpdatedModal, setShowAvailabilityUpdatedModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmAcceptanceModal, setShowConfirmAcceptanceModal] = useState(false);
  // const [showRequestAcceptedModal, setShowRequestAcceptedModal] = useState(false);
  const [showDeclineRequestModal, setShowDeclineRequestModal] = useState(false);
  const [showRequestDeclinedModal, setShowRequestDeclinedModal] = useState(false);
  const [showClockInConfirmationModal, setShowClockInConfirmationModal] = useState(false); // NEW
  const [showClockInSuccessModal, setShowClockInSuccessModal] = useState(false);

  useEffect(() => {
    //load attendees
    getEventAttendees({
      callBack: ({ attendees }) => {
        setAttendees(attendees)

        const IAmAttending = attendees?.filter(att => att?.flex_id === user?.id)?.[0]

        if (IAmAttending) {
          const { clocked_in_at, clocked_out_at } = IAmAttending

          setClockedInAt(clocked_in_at)
          setClockedOutAt(clocked_out_at)

          setStatus('available')

        } else {
          const inMyRequests = myRequests?.filter(r => r?.event_id === event?.id)?.[0]
          const inFlexrRequests = flexrRequests?.filter(r => r?.event_id === event?.id)?.[0]

          if (inMyRequests) {
            setStatus('pending')

          }

          if (inFlexrRequests) {
            setStatus('unavailable')
          }
        }
      },
      event_id: event?.id
    })
  }, [myRequests, flexrRequests])

  // useEffect(() => {
  //   let interval;

  //   // if (clockedInAt && startTime === null) {
  //   //   // Clocked in for the first time
  //   //   setStartTime(Date.now());
  //   // }

  //   if (clockedInAt && startTime !== null) {
  //     interval = setInterval(() => {
  //       const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  //       let newRemainingTime = event?.duration - elapsedTime;

  //       if (newRemainingTime <= 0) {
  //         newRemainingTime = 0;
  //         clearInterval(interval);
  //       }
  //       setRemainingTime(newRemainingTime);
  //     }, 1000);
  //   }

  //   // Reset the timer if the user clocks out outside this flow
  //   // if (!clockedInAt) {
  //   //   setRemainingTime(TARGET_DURATION_SECONDS);
  //   //   setStartTime(null);
  //   // }

  //   return () => clearInterval(interval);
  // }, [clockedInAt]);

  // Handler functions
  const handleClockIn = () => {
    setShowClockInConfirmationModal(false);
    setShowLoadingModal(true);

    // Simulate API call delay
    setTimeout(() => {
      setShowLoadingModal(false);
      // Setting clockedInAt=true triggers the useEffect timer logic immediately
      setClockedInAt(true);
      setShowClockInSuccessModal(true);
    }, 1500);
  };

  const handleClockInSuccessDismiss = () => {
    // Dismisses the success modal and returns to event details with timer running
    setShowClockInSuccessModal(false);
  };

  const handleClockOut = () => {
    setShowClockOutModal(false);
    setShowLoadingModal(true);
    setTimeout(() => {
      setShowLoadingModal(false);
      setClockedInAt(false);
      setShowClockOutSuccessModal(true);
    }, 2000);
  };

  const handleUpdateAvailability = () => {
    setShowUpdateAvailabilityModal(false);
    setShowLoadingModal(true);
    rejectEventRequest({
      event_id: event?.id,
      callBack: ({ }) => {
        setStatus(null);
        setShowAvailabilityUpdatedModal(true);
        setShowLoadingModal(false);
      }
    })
  };

  const handleRateReview = () => {
    setShowClockOutSuccessModal(false);
    setShowReviewModal(true);
  };

  const handleSubmitReview = (reviewData) => {
    console.log('Review submitted:', reviewData);
    setShowReviewModal(false);
    router.back();
  };

  const handleBackToDashboard = () => {
    setShowAvailabilityUpdatedModal(false);
    router.back();
  };

  const handleAcceptRequest = () => {
    setShowConfirmAcceptanceModal(false);
    setShowLoadingModal(true);

    acceptEventRequest({
      callBack: ({ attendee }) => {
        setShowLoadingModal(false);
        setStatus('available');
        // setShowRequestAcceptedModal(true);
      },
      event_id: event?.id
    })
  };

  const handleDeclineRequest = () => {
    setShowDeclineRequestModal(false);
    setShowLoadingModal(true);

    rejectEventRequest({
      event_id: event?.id,
      callBack: ({ }) => {
        setShowRequestDeclinedModal(true);
        setShowLoadingModal(false);
      }
    })
  };

  const handleViewDetailsAfterAccept = () => {
    // setShowRequestAcceptedModal(false);
  }

  const handleViewOtherRequests = () => {
    setShowRequestDeclinedModal(false);
    router.back();
  }

  const onRequestToParticipate = () => {
    requestToParticipate({
      event,
      flexr_id: event?.hostInfo?.id,
      callBack: ({ }) => { }
    })
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <EventDetailsHeader
          event={event}
          status={status}
          showDetails={showDetails}
          onToggleDetails={() => setShowDetails(!showDetails)}
          onUpdateAvailability={() => setShowUpdateAvailabilityModal(true)}
        />

        {/* Timer */}
        {status === 'available' && (
          <AttendanceTimer
            start_time={event?.start_time}
            duration={event?.duration}
            attendance_duration={event?.attendance_duration}
            clocked_in_at={clockedInAt}
            clocked_out_at={clockedOutAt}

          // isClockedIn={clockedInAt}
          // timeDisplay={formatTime(remainingTime)}
          // remainingTime={remainingTime}
          // status={status} // 
          />
        )}

        {/* Expandable Details */}
        {/* Event details */}
        <EventDetailsContent event={event} status={status} attendees={attendees} showDetails={showDetails} />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Buttons */}
      {/* <ActionButtons
        clockedInAt={clockedInAt}
        onClockOut={() => setShowClockOutModal(true)}
      /> */}

      {/* Action Buttons */}
      {
        status === null
          ?
          <ActionButtons
            // btn1="Decline"
            btn2="Request to participate"
            // Decline opens the Decline Request confirmation modal
            // onBtn1Press={() => setShowDeclineRequestModal(true)}
            // Accept opens the Confirm Acceptance modal
            onBtn2Press={onRequestToParticipate}
          />
          :
          status === 'unavailable'
            ?
            <ActionButtons
              btn1="Decline"
              btn2="Accept"
              // Decline opens the Decline Request confirmation modal
              onBtn1Press={() => setShowDeclineRequestModal(true)}
              // Accept opens the Confirm Acceptance modal
              onBtn2Press={() => setShowConfirmAcceptanceModal(true)}
            />
            :
            status === 'pending'
            &&
            <ActionButtons
              btn1="Awaiting approval"
              onBtn1Press={() => {}}
              disableBtn1={true}
            />
        // : status === "available" && !clockedInAt ? (
        //   <ActionButtons
        //     btn1="Clock Out"
        //     btn2="Clock In"
        //     disableBtn1={true}
        //     onBtn2Press={() => setShowClockInConfirmationModal(true)}
        //   />
        // ) : clockedInAt ? (
        //   <ActionButtons
        //     btn1="Clock Out"
        //     btn2="Clock In"
        //     onBtn1Press={() => setShowClockOutModal(true)}
        //     disableBtn2={true}
        //   />
        // ) : null
      }


      {/* Modals */}

      <ClockInConfirmationModal
        visible={showClockInConfirmationModal}
        onClose={() => setShowClockInConfirmationModal(false)}
        onConfirm={handleClockIn}
      />

      <ClockInSuccessModal
        visible={showClockInSuccessModal}
        onClose={() => setShowClockInSuccessModal(false)}
        onFinish={handleClockInSuccessDismiss}
        currentTime={formatTime(remainingTime)} // <-- PASS SYNCHRONIZED TIME HERE
      />

      <ClockOutModal
        visible={showClockOutModal}
        onClose={() => setShowClockOutModal(false)}
        onConfirm={handleClockOut}
      />

      <Loading visible={showLoadingModal} />

      <ConfirmAcceptanceModal
        visible={showConfirmAcceptanceModal}
        onClose={() => setShowConfirmAcceptanceModal(false)}
        onConfirm={handleAcceptRequest}
      />

      {/* <RequestAcceptedModal
        visible={showRequestAcceptedModal}
        onClose={() => setShowRequestAcceptedModal(false)}
        onViewDetails={handleViewDetailsAfterAccept}
      /> */}

      <DeclineRequestModal
        visible={showDeclineRequestModal}
        onClose={() => setShowDeclineRequestModal(false)}
        onConfirm={handleDeclineRequest}
      />

      <RequestDeclinedModal
        visible={showRequestDeclinedModal}
        onClose={() => setShowRequestDeclinedModal(false)}
        onViewOtherRequests={handleViewOtherRequests}
      />

      <ClockOutSuccessModal
        visible={showClockOutSuccessModal}
        onClose={() => {
          setShowClockOutSuccessModal(false);
          router.back();
        }}
        onRateReview={handleRateReview}
      />

      <ReviewModal
        visible={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
      />

      <UpdateAvailabilityModal
        visible={showUpdateAvailabilityModal}
        onClose={() => setShowUpdateAvailabilityModal(false)}
        onConfirm={handleUpdateAvailability}
        eventTitle={event.title}
      />

      <AvailabilityUpdatedModal
        visible={showAvailabilityUpdatedModal}
        onClose={() => setShowAvailabilityUpdatedModal(false)}
        onBackToDashboard={handleBackToDashboard}
        eventTitle={event.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});