import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import EventCard from '../../../components/EventCard';
import ClockInConfirmationModal from '../../../components/modals/ClockInConfirmationModal';
import ClockInSuccessModal from '../../../components/modals/ClockInSuccessModal';
import ClockOutModal from '../../../components/modals/ClockOutModal';
import ClockOutSuccessModal from '../../../components/modals/ClockOutSuccessModal';
import ReviewModal from '../../../components/modals/ReviewModal';

const FlexAttendanceItem = ({ flex, onClockIn, onClockOut }) => {
    const isClocked = flex.clockedIn && !flex.clockedOut;
    const isCompleted = flex.clockedIn && flex.clockedOut;
    const isPending = !flex.clockedIn && !flex.clockedOut;

    const borderColor = isCompleted ? '#22C55E' : isPending ? '#EF4444' : '#22C55E';

    return (
        <View style={[styles.flexItem, { borderLeftColor: borderColor }]}>
            <View style={styles.flexInfo}>
                <Text style={styles.flexName}>{flex.name}</Text>
                <View style={styles.flexTimesRow}>
                    <Text style={styles.flexTimeText}>
                        Clocked In: <Text style={[styles.timeValue, flex.clockedIn && flex.clockedInTime !== '0:00' && styles.timeValueBlue]}>{flex.clockedInTime}</Text>
                    </Text>
                    <Text style={styles.flexTimeText}>
                        {' '}Clocked Out: <Text style={[styles.timeValue, flex.clockedOut && flex.clockedOutTime !== '0:00' && styles.timeValueBlue]}>{flex.clockedOutTime}</Text>
                    </Text>
                </View>
                <Text style={styles.totalHours}>
                    Total Hours: <Text style={styles.hoursValue}>{flex.totalHours}</Text>
                </Text>
            </View>

            <View style={styles.rightSection}>
                {flex.isActive && (
                    <View style={styles.activeIndicator}>
                        <Ionicons name="notifications" size={14} color="#22C55E" />
                    </View>
                )}

                <View style={styles.actionButtonContainer}>
                    {!isCompleted && (
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                isClocked ? styles.clockOutButton : styles.clockInButton
                            ]}
                            onPress={isClocked ? onClockOut : onClockIn}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.actionButtonText}>
                                {isClocked ? 'Clock Out' : 'Clock In'}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {isCompleted && (
                        <View style={styles.actionButtonDisabled}>
                            <Text style={styles.actionButtonTextDisabled}>Clock Out</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default function AttendanceTracker() {
    const [activeTab, setActiveTab] = useState('ongoing');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeFlexTab, setActiveFlexTab] = useState('all');

    // Modal states
    const [showClockInConfirmation, setShowClockInConfirmation] = useState(false);
    const [showClockInSuccess, setShowClockInSuccess] = useState(false);
    const [showClockOutConfirmation, setShowClockOutConfirmation] = useState(false);
    const [showClockOutSuccess, setShowClockOutSuccess] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    
    // Selected flex for modals
    const [selectedFlex, setSelectedFlex] = useState(null);
    
    // Timer for clock in success modal
    const [elapsedTime, setElapsedTime] = useState('04:59:40');
    const [startTime, setStartTime] = useState(null);

    // Mock data - replace with your actual data
    const ongoingEvents = [
        {
            id: '1',
            title: 'Bikini Beach Party',
            date: '2025-01-30',
            start_time: '16:00',
            duration: 360,
            address: 'Giwa gardens',
            city: 'Lagos',
            state: 'Lagos',
            country: 'Nigeria',
            price_reward: 50000,
            flexesAttending: 20,
            hours: 5,
            flexes: [
                {
                    id: '1',
                    name: 'John Doe',
                    clockedIn: false,
                    clockedOut: false,
                    clockedInTime: '0:00',
                    clockedOutTime: '0:00',
                    totalHours: '0 hours',
                    isActive: true,
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    clockedIn: true,
                    clockedOut: false,
                    clockedInTime: '5:30pm',
                    clockedOutTime: '0:00',
                    totalHours: '1hr 30mins',
                    isActive: false,
                },
                {
                    id: '3',
                    name: 'Mike Johnson',
                    clockedIn: false,
                    clockedOut: false,
                    clockedInTime: '0:00',
                    clockedOutTime: '0:00',
                    totalHours: '0 hr',
                    isActive: false,
                },
                {
                    id: '4',
                    name: 'Sarah Williams',
                    clockedIn: true,
                    clockedOut: false,
                    clockedInTime: '5:30pm',
                    clockedOutTime: '0:00',
                    totalHours: '5 hr',
                    isActive: false,
                },
                {
                    id: '5',
                    name: 'David Brown',
                    clockedIn: true,
                    clockedOut: true,
                    clockedInTime: '5:30pm',
                    clockedOutTime: '10:30pm',
                    totalHours: '5 hr',
                    isActive: false,
                },
            ],
        },
    ];

    const pastEvents = [
        {
            id: '2',
            title: 'Bikini Beach Party',
            date: '2025-01-30',
            start_time: '16:00',
            duration: 360,
            address: 'Giwa gardens',
            city: 'Lagos',
            state: 'Lagos',
            country: 'Nigeria',
            price_reward: 50000,
        },
        {
            id: '3',
            title: 'Bikini Beach Party',
            date: '2025-01-30',
            start_time: '16:00',
            duration: 360,
            address: 'Giwa gardens',
            city: 'Lagos',
            state: 'Lagos',
            country: 'Nigeria',
            price_reward: 50000,
        },
    ];

    const handleEventPress = (eventId) => {
        if (activeTab === 'ongoing') {
            const event = ongoingEvents.find(e => e.id === eventId);
            setSelectedEvent(event);
        }
    };

    const handleClockIn = (flex) => {
        setSelectedFlex(flex);
        setShowClockInConfirmation(true);
    };

    const handleClockInConfirm = () => {
        setShowClockInConfirmation(false);
        setStartTime(Date.now());
        // Update flex data here in your actual implementation
        setTimeout(() => {
            setShowClockInSuccess(true);
        }, 300);
    };

    const handleClockOut = (flex) => {
        setSelectedFlex(flex);
        setShowClockOutConfirmation(true);
    };

    const handleClockOutConfirm = () => {
        setShowClockOutConfirmation(false);
        // Update flex data here in your actual implementation
        setTimeout(() => {
            setShowClockOutSuccess(true);
        }, 300);
    };

    const handleRateReview = () => {
        setShowClockOutSuccess(false);
        setTimeout(() => {
            setShowReviewModal(true);
        }, 300);
    };

    const handleReviewSubmit = (reviewData) => {
        console.log('Review submitted:', reviewData);
        
        // Check if user wants to tip
        if (reviewData.tip) {
            // Close review modal first
            setShowReviewModal(false);
            
            // Navigate to tip screen after a short delay for smooth transition
            setTimeout(() => {
                router.push({
                    pathname: '/flexr/attendance/tip-flex',
                    params: {
                        flexName: selectedFlex?.name,
                        flexId: selectedFlex?.id,
                        eventId: selectedEvent?.id,
                        eventName: selectedEvent?.title,
                        suggestedTip: reviewData.tip.toString(),
                    }
                });
            }, 300);
        } else {
            // Just close the modal if no tip
            setShowReviewModal(false);
        }
    };

    // Timer effect for clock in success modal
    useEffect(() => {
        let interval;
        if (showClockInSuccess && startTime) {
            interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const hours = Math.floor(elapsed / 3600000);
                const minutes = Math.floor((elapsed % 3600000) / 60000);
                const seconds = Math.floor((elapsed % 60000) / 1000);
                setElapsedTime(
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showClockInSuccess, startTime]);

    const filteredFlexes = selectedEvent?.flexes?.filter((flex) => {
        if (activeFlexTab === 'all') return true;
        if (activeFlexTab === 'requests') return !flex.clockedIn && !flex.clockedOut;
        if (activeFlexTab === 'pending') return !flex.clockedIn && !flex.clockedOut;
        if (activeFlexTab === 'clockedIn') return flex.clockedIn && !flex.clockedOut;
        if (activeFlexTab === 'clockedOut') return flex.clockedIn && flex.clockedOut;
        return true;
    }) || [];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Attendance Tracker</Text>
            </View>

            {/* Main Tabs */}
            <View style={styles.mainTabs}>
                <TouchableOpacity
                    style={[styles.mainTab, activeTab === 'ongoing' && styles.mainTabActive]}
                    onPress={() => {
                        setActiveTab('ongoing');
                        setSelectedEvent(null);
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.mainTabText, activeTab === 'ongoing' && styles.mainTabTextActive]}>
                        Ongoing Event
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.mainTab, activeTab === 'past' && styles.mainTabActive]}
                    onPress={() => {
                        setActiveTab('past');
                        setSelectedEvent(null);
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.mainTabText, activeTab === 'past' && styles.mainTabTextActive]}>
                        Past Events
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Show event list when no event is selected OR when on Past Events tab */}
                {(!selectedEvent || activeTab === 'past') && (
                    <View style={styles.eventList}>
                        {activeTab === 'ongoing' && ongoingEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onPress={handleEventPress}
                                styles={{
                                    eventCard: { marginHorizontal: 0, marginBottom: 12 },
                                    chevronIcon: { top: '50%' }
                                }}
                                showDate={false}
                                showDivider={false}
                            />
                        ))}
                        {activeTab === 'past' && pastEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onPress={handleEventPress}
                                styles={{
                                    eventCard: { marginHorizontal: 0, marginBottom: 12 },
                                    chevronIcon: { top: '50%' }
                                }}
                                showDate={false}
                                showDivider={false}
                            />
                        ))}
                    </View>
                )}

                {/* Show attendance detail when event is selected and on Ongoing tab */}
                {selectedEvent && activeTab === 'ongoing' && (
                    <View style={styles.attendanceDetail}>
                        {/* Event Info Card */}
                        <View style={styles.eventInfoCard}>
                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventInfoLabel}>Event Name:</Text>
                                <Text style={styles.eventInfoValue}>{selectedEvent.title}</Text>
                            </View>
                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventInfoLabel}>Event Date & Time:</Text>
                                <Text style={styles.eventInfoValue}>
                                    Jan 30, 2025, 4:00 PM - 10:00 PM
                                </Text>
                            </View>
                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventInfoLabel}>Location:</Text>
                                <Text style={styles.eventInfoValue}>
                                    {selectedEvent.address}, {selectedEvent.city}
                                </Text>
                            </View>
                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventInfoLabel}>Flexes Attending:</Text>
                                <Text style={styles.eventInfoValue}>{selectedEvent.flexesAttending} Flexes</Text>
                            </View>
                            <View style={styles.eventInfoRow}>
                                <Text style={styles.eventInfoLabel}>Hours:</Text>
                                <Text style={styles.eventInfoValue}>{selectedEvent.hours} Hours</Text>
                            </View>
                        </View>

                        {/* Flex Attendance List */}
                        <View style={styles.flexListSection}>
                            <Text style={styles.sectionTitle}>Flex Attendance List</Text>

                            {/* Flex Tabs */}
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.flexTabsContainer}
                            >
                                <View style={styles.flexTabs}>
                                    {['all', 'requests', 'pending', 'clockedIn', 'clockedOut'].map((tab) => (
                                        <TouchableOpacity
                                            key={tab}
                                            style={[styles.flexTab, activeFlexTab === tab && styles.flexTabActive]}
                                            onPress={() => setActiveFlexTab(tab)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={[styles.flexTabText, activeFlexTab === tab && styles.flexTabTextActive]}>
                                                {tab === 'all' ? 'All' :
                                                    tab === 'requests' ? 'Requests' :
                                                        tab === 'pending' ? 'Pending' :
                                                            tab === 'clockedIn' ? 'Clocked In' :
                                                                'Clocked Out'}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>

                            {/* Flex List */}
                            <View style={styles.flexList}>
                                {filteredFlexes.length === 0 ? (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyStateText}>
                                            {activeFlexTab === 'requests'
                                                ? 'No Clock In/Out Requests'
                                                : 'No flexes found'}
                                        </Text>
                                    </View>
                                ) : (
                                    filteredFlexes.map((flex) => (
                                        <FlexAttendanceItem
                                            key={flex.id}
                                            flex={flex}
                                            onClockIn={() => handleClockIn(flex)}
                                            onClockOut={() => handleClockOut(flex)}
                                        />
                                    ))
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Modals */}
            <ClockInConfirmationModal
                visible={showClockInConfirmation}
                onClose={() => setShowClockInConfirmation(false)}
                onConfirm={handleClockInConfirm}
                message={selectedFlex?.name ? `Confirm ${selectedFlex.name}'s clock-in. Ensure the flex has clocked in on their end before proceeding.` : undefined}
            />
            
            <ClockInSuccessModal
                visible={showClockInSuccess}
                onClose={() => setShowClockInSuccess(false)}
                onFinish={() => setShowClockInSuccess(false)}
                currentTime={elapsedTime}
                buttonText="OK"
            />
            
            <ClockOutModal
                visible={showClockOutConfirmation}
                onClose={() => setShowClockOutConfirmation(false)}
                onConfirm={handleClockOutConfirm}
                message={selectedFlex?.name ? `Confirm ${selectedFlex.name}'s clock-out. Ensure the flex has completed their required hours before proceeding.` : undefined}
            />
            
            <ClockOutSuccessModal
                visible={showClockOutSuccess}
                onClose={() => setShowClockOutSuccess(false)}
                onRateReview={handleRateReview}
                flexName={selectedFlex?.name}
            />
            
            <ReviewModal
                visible={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                onSubmit={handleReviewSubmit}
                flexName={selectedFlex?.name}
                showTipping={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
    },
    mainTabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        gap: 12,
    },
    mainTab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: 'transparent',
    },
    mainTabActive: {
        backgroundColor: 'rgb(238,240,255)',
    },
    mainTabText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#9CA3AF',
    },
    mainTabTextActive: {
        color: 'rgb(79,70,229)',
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    eventList: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    attendanceDetail: {
        paddingHorizontal: 16,
    },
    eventInfoCard: {
        backgroundColor: 'rgb(245,247,250)',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },
    eventInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    eventInfoLabel: {
        fontSize: 15,
        color: '#9CA3AF',
        fontWeight: '400',
        flex: 0.4,
    },
    eventInfoValue: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
        textAlign: 'right',
        flex: 0.6,
    },
    flexListSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 16,
    },
    flexTabsContainer: {
        marginBottom: 20,
    },
    flexTabs: {
        flexDirection: 'row',
        gap: 12,
    },
    flexTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    flexTabActive: {
        backgroundColor: 'rgb(238,240,255)',
    },
    flexTabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9CA3AF',
    },
    flexTabTextActive: {
        color: 'rgb(79,70,229)',
        fontWeight: '600',
    },
    flexList: {
        gap: 16,
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    flexInfo: {
        flex: 1,
    },
    flexName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    flexTimesRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    flexTimeText: {
        fontSize: 11,
        color: '#9CA3AF',
    },
    timeValue: {
        color: '#000',
        fontWeight: '500',
    },
    timeValueBlue: {
        color: 'rgb(79,70,229)',
        fontWeight: '600',
    },
    totalHours: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    hoursValue: {
        color: '#000',
        fontWeight: '600',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    activeIndicator: {
        paddingHorizontal: 1,
    },
    actionButtonContainer: {
        
    },
    actionButton: {
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 12,
        minWidth: 40,
        alignItems: 'center',
    },
    clockInButton: {
        backgroundColor: 'rgb(79,70,229)',
    },
    clockOutButton: {
        backgroundColor: 'rgb(218,220,246)',
    },
    actionButtonDisabled: {
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 12,
        minWidth: 110,
        alignItems: 'center',
        backgroundColor: 'rgb(229,231,235)',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    actionButtonTextDisabled: {
        color: '#9CA3AF',
        fontSize: 15,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyStateText: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
    },
});