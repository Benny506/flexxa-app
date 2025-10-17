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

export default function FlexrRequests() {
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
            ticketType: 'Regular ticket',
            ticketColor: '#FF69B4',
        },
        {
            id: 2,
            date: { month: 'dec', day: '31' },
            title: 'Oworoshoki Street Carnival',
            time: 'Sat, 12:00am - 5:00am',
            location: 'Oworoshoki street, lagos',
            price: '₦2,000',
            ticketType: 'Earlybird ticket',
            ticketColor: '#6366F1',
        },
        {
            id: 3,
            date: { month: 'dec', day: '10' },
            title: 'Club Party',
            time: 'Fri, 11:00pm - 5:00am',
            location: 'Cubana club ikeja, lagos',
            price: '₦12,000',
            ticketType: 'Premium ticket',
            ticketColor: '#14B8A6',
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Flexr Requests</Text>
            </View>

            {/* Tabs */}
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

            {/* Request List */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {requests.map((request) => (
                    <TouchableOpacity
                        key={request.id}
                        style={styles.requestCard}
                        activeOpacity={0.7}
                    >
                        {/* Date Badge */}
                        <View style={styles.dateBadge}>
                            <Text style={styles.dateMonth}>{request.date.month}</Text>
                            <Text style={styles.dateDay}>{request.date.day}</Text>
                        </View>

                        {/* Request Details */}
                        <View style={styles.requestDetails}>
                            <View style={styles.requestHeader}>
                                <Text style={styles.requestTitle}>{request.title}</Text>
                                <View
                                    style={[
                                        styles.ticketBadge,
                                        { backgroundColor: request.ticketColor + '20' },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.ticketText,
                                            { color: request.ticketColor },
                                        ]}
                                    >
                                        {request.ticketType}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.requestTime}>{request.time}</Text>
                            <Text style={styles.requestLocation}>{request.location}</Text>
                            <Text style={styles.requestPrice}>{request.price}</Text>
                        </View>

                        {/* Chevron */}
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                ))}
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
    },
    requestCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    dateBadge: {
        width: 48,
        alignItems: 'center',
        marginRight: 12,
    },
    dateMonth: {
        fontSize: 12,
        color: '#999',
        textTransform: 'lowercase',
        fontWeight: '500',
    },
    dateDay: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    requestDetails: {
        flex: 1,
    },
    requestHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    requestTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    ticketBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    ticketText: {
        fontSize: 11,
        fontWeight: '600',
    },
    requestTime: {
        fontSize: 13,
        color: '#666',
        marginBottom: 2,
    },
    requestLocation: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    requestPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
});