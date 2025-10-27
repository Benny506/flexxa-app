import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Import reusable components
import EventDetailsHeader from '../../../components/event/EventDetailsHeader';
import AttendanceTimer from '../../../components/event/AttendanceTimer';
import EventDetailsContent from '../../../components/event/EventDetailsContent';
import ActionButtons from '../../../components/event/ActionButtons';

// Import modals
import ClockOutModal from '../../../components/modals/ClockOutModal';
import ClockOutSuccessModal from '../../../components/modals/ClockOutSuccessModal';
import UpdateAvailabilityModal from '../../../components/modals/UpdateAvailabilityModal';
import AvailabilityUpdatedModal from '../../../components/modals/AvailabilityUpdatedModal';
import ReviewModal from '../../../components/modals/ReviewModal';
import Loading from '../../../components/loader';
import ConfirmAcceptanceModal from '../../../components/modals/ConfirmAcceptanceModal';
import RequestAcceptedModal from '../../../components/modals/RequestAcceptedModal';
import DeclineRequestModal from '../../../components/modals/DeclineRequestModal';
import RequestDeclinedModal from '../../../components/modals/RequestDeclinedModal';
import ClockInSuccessModal from '../../../components/modals/ClockInSuccessModal';
import ClockInConfirmationModal from '../../../components/modals/ClockInConfirmationModal';

// Set the target duration for attendance (6 hours = 6 * 3600 seconds)
const TARGET_DURATION_SECONDS = 6 * 3600;

// Format function (moved from AttendanceTimer.js)
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // State management
  const [status, setStatus] = useState('unavailable');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [remainingTime, setRemainingTime] = useState(TARGET_DURATION_SECONDS);
  const [startTime, setStartTime] = useState(null);

  // Modal states
  const [showClockOutModal, setShowClockOutModal] = useState(false);
  const [showClockOutSuccessModal, setShowClockOutSuccessModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showUpdateAvailabilityModal, setShowUpdateAvailabilityModal] = useState(false);
  const [showAvailabilityUpdatedModal, setShowAvailabilityUpdatedModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showConfirmAcceptanceModal, setShowConfirmAcceptanceModal] = useState(false);
  const [showRequestAcceptedModal, setShowRequestAcceptedModal] = useState(false);
  const [showDeclineRequestModal, setShowDeclineRequestModal] = useState(false);
  const [showRequestDeclinedModal, setShowRequestDeclinedModal] = useState(false);
  const [showClockInConfirmationModal, setShowClockInConfirmationModal] = useState(false); // NEW
  const [showClockInSuccessModal, setShowClockInSuccessModal] = useState(false);

  // Event data
  const event = {
    image: 'https://via.placeholder.com/400x200',
    ticketType: 'Regular ticket',
    title: 'Bikini Pool Party',
    price: '₦5,000',
    reward: 'Reward',
    date: 'Friday, October 20',
    time: '12:00pm - 10:00pm',
    location: 'Giwa gardens, Lagos',
    host: {
      name: 'John Doe',
      rating: 4,
      badge: 'Coolest host',
      avatar: 'https://via.placeholder.com/40',
      eventsHosted: 55,
    },
    activities: ['Music', 'Stripping', 'Social', 'Games', 'Networking'],
    attendees: 25,
    description: 'Dive into the ultimate poolside experience at our Bikini Pool Party! Enjoy refreshing cocktails, vibrant music, and soothing games as you mingle with fellow partygoers.',
    instructions: [
      'You are required to stay for a minimum of 6 hours.',
      'Flex must clock in upon arrival and clock out before leaving.',
      'Rewards are only available upon completion of the full attendance duration and verified clock-out.',
    ],
  };

  useEffect(() => {
    let interval;

    if (isClockedIn && startTime === null) {
      // Clocked in for the first time
      setStartTime(Date.now());
    }

    if (isClockedIn && startTime !== null) {
      interval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        let newRemainingTime = TARGET_DURATION_SECONDS - elapsedTime;

        if (newRemainingTime <= 0) {
          newRemainingTime = 0;
          clearInterval(interval);
        }
        setRemainingTime(newRemainingTime);
      }, 1000);
    }

    // Reset the timer if the user clocks out outside this flow
    if (!isClockedIn) {
      setRemainingTime(TARGET_DURATION_SECONDS);
      setStartTime(null);
    }

    return () => clearInterval(interval);
  }, [isClockedIn, startTime]);

  // Handler functions
  const handleClockIn = () => {
    setShowClockInConfirmationModal(false);
    setShowLoadingModal(true);

    // Simulate API call delay
    setTimeout(() => {
      setShowLoadingModal(false);
      // Setting isClockedIn=true triggers the useEffect timer logic immediately
      setIsClockedIn(true);
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
      setIsClockedIn(false);
      setShowClockOutSuccessModal(true);
    }, 2000);
  };

  const handleUpdateAvailability = () => {
    setShowUpdateAvailabilityModal(false);
    setShowLoadingModal(true);
    setTimeout(() => {
      setShowLoadingModal(false);
      setStatus('unavailable');
      setShowAvailabilityUpdatedModal(true);
    }, 2000);
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

    setTimeout(() => {
      setShowLoadingModal(false);
      setStatus('available');
      setShowRequestAcceptedModal(true);
    }, 1500);
  };

  const handleDeclineRequest = () => {
    setShowDeclineRequestModal(false);
    setShowLoadingModal(true);

    setTimeout(() => {
      setShowLoadingModal(false);
      setShowRequestDeclinedModal(true);
    }, 1500);
  };

  const handleViewDetailsAfterAccept = () => {
    setShowRequestAcceptedModal(false);
  }

  const handleViewOtherRequests = () => {
    setShowRequestDeclinedModal(false);
    router.back();
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
            isClockedIn={isClockedIn}
            timeDisplay={formatTime(remainingTime)}
            remainingTime={remainingTime}
            status={status} // <-- New prop for synchronization and fading
          />
        )}

        {/* Expandable Details */}
        {/* Event details */}
        {(status === 'unavailable' || (status === 'available' && showDetails)) && (
          <EventDetailsContent event={event} status={status} />
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Buttons */}
      {/* <ActionButtons
        isClockedIn={isClockedIn}
        onClockOut={() => setShowClockOutModal(true)}
      /> */}

      {/* Action Buttons */}
      {status === "unavailable" ? (
        <ActionButtons
          btn1="Decline"
          btn2="Accept"
          // Decline opens the Decline Request confirmation modal
          onBtn1Press={() => setShowDeclineRequestModal(true)}
          // Accept opens the Confirm Acceptance modal
          onBtn2Press={() => setShowConfirmAcceptanceModal(true)}
        />
      ) : status === "available" && !isClockedIn ? (
        <ActionButtons
          btn1="Clock Out"
          btn2="Clock In"
          disableBtn1={true}
          onBtn2Press={() => setShowClockInConfirmationModal(true)}
        />
      ) : isClockedIn ? (
        <ActionButtons
          btn1="Clock Out"
          btn2="Clock In"
          onBtn1Press={() => setShowClockOutModal(true)}
          disableBtn2={true}
        />
      ) : null}

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

      <RequestAcceptedModal
        visible={showRequestAcceptedModal}
        onClose={() => setShowRequestAcceptedModal(false)}
        onViewDetails={handleViewDetailsAfterAccept}
      />

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