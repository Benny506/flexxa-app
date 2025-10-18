import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import EventCard from '../../../components/EventCard'; // Use the existing EventCard component

export default function FlexrRequests() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('New');

    const tabs = [
        { id: 'New', label: 'New', count: 3 },
        { id: 'Upcoming', label: 'Upcoming', count: null },
        { id: 'Past', label: 'Past', count: null },
        { id: 'Declined', label: 'Declined', count: null },
    ];

    const requests = [
        {
            id: 1,
            date: { month: 'oct', day: '20' },
            title: 'Bikini Pool Party',
            time: 'Fri, 12:00pm - 10:00pm',
            location: 'Giwa gardens, lagos',
            price: '₦5,000',
            // Mapped to EventCard's 'status' prop
            status: 'Regular ticket', 
        },
        {
            id: 2,
            date: { month: 'dec', day: '31' },
            title: 'Oworoshoki Street Carnival',
            time: 'Sat, 12:00am - 5:00am',
            location: 'Oworoshoki street, lagos',
            price: '₦2,000',
            // Mapped to EventCard's 'status' prop
            status: 'Earlybird ticket',
        },
        {
            id: 3,
            date: { month: 'dec', day: '10' },
            title: 'Club Party',
            time: 'Fri, 11:00pm - 5:00am',
            location: 'Cubana club ikeja, lagos',
            price: '₦12,000',
            // Mapped to EventCard's 'status' prop
            status: 'Premium ticket', 
        },
    ];

    const handleRequestPress = (requestId) => {
        router.push(`/event-details/${requestId}`);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Flexr Requests</Text>
            </View>

            <View style={styles.tabsContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tab}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <View style={styles.tabContent}>
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab.id && styles.tabTextActive,
                                ]}
                            >
                                {tab.label}
                            </Text>
                            {tab.count && (
                                <View style={styles.countBadge}>
                                    <Text style={styles.countText}>{tab.count}</Text>
                                </View>
                            )}
                        </View>
                        {activeTab === tab.id && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {requests.map((request) => (
                    // Reusing the EventCard component
                    <EventCard 
                        key={request.id}
                        event={request} // Pass the request object directly
                        onPress={handleRequestPress}
                    />
                ))}
                
                {/* Add bottom spacing if needed */}
                <View style={{ height: 20 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    tab: {
        marginRight: 24,
        paddingBottom: 12,
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    tabText: {
        fontSize: 14,
        color: '#999',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#484ED4',
        fontWeight: '600',
    },
    countBadge: {
        backgroundColor: '#484ED4',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    countText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '600',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#484ED4',
    },
    scrollView: {
        flex: 1,
        // Add vertical padding to match the previous list style
        paddingVertical: 12, 
    },
    // Removed all requestCard, dateBadge, and ticketBadge styles as they are now handled by EventCard.js
});