import AntDesign from '@expo/vector-icons/AntDesign';
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
import { useSelector } from 'react-redux';
import EventCard from '../../../components/EventCard';
import ZeroItems from '../../../components/ZeroItems';
import useApiReqs from '../../../hooks/useApiReqs';
import { getEventsState } from '../../../redux/slices/eventsSlice';
import { getUserDetailsState } from '../../../redux/slices/userDetailsSlice';
import colors from '../../../utils/colors/colors';

export default function FlexrRequests() {
    const router = useRouter();

    const { fetchEvents } = useApiReqs()

    const profile = useSelector(state => getUserDetailsState(state).profile)
    const events = useSelector(state => getEventsState(state).events)
    const eventsCount = useSelector(state => getEventsState(state).counts)

    const [activeTab, setActiveTab] = useState('new');
    const [canLoadMore, setCanLoadMore] = useState(false)

    useEffect(() => {
        fetchEvents({
            callBack: ({ canLoadMore }) => {
                setCanLoadMore(canLoadMore)
            }
        })
    }, [])

    const filteredEvents = events?.filter(e => {
        const { status } = e

        const matchesTab = status?.toLowerCase() === activeTab?.toLowerCase()

        return matchesTab
    })

    const handleRequestPress = ({ event }) => {
        router.push({
            pathname: `/event-details`,
            params: { event: JSON.stringify(event) }
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Events</Text>

                {
                    profile?.usertype === 'flexr'
                    &&
                    <TouchableOpacity
                        onPress={() => router.push('/event-setup')}
                        style={{
                            padding: 12, borderRadius: 10, borderWidth: 1,
                            borderColor: colors._484ED4
                        }}
                    >
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                }
            </View>

            <View style={{
            }}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.tabsContainer}
                >
                    {Object.keys(eventsCount).map((tab, i) => {

                        const isActive = activeTab === tab ? true : false

                        const count = eventsCount[tab]

                        return (
                            <TouchableOpacity
                                key={i}
                                style={styles.tab}
                                onPress={() => setActiveTab(tab)}
                            >
                                <View style={styles.tabContent}>
                                    <Text
                                        style={[
                                            styles.tabText,
                                            isActive && styles.tabTextActive,
                                            {
                                                textTransform: 'capitalize'
                                            }
                                        ]}
                                    >
                                        {tab}
                                    </Text>
                                    {(typeof count === 'number' && count > 0) && (
                                        <View style={styles.countBadge}>
                                            <Text style={styles.countText}>{count}</Text>
                                        </View>
                                    )}
                                </View>
                                {isActive && <View style={styles.tabIndicator} />}
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>

            <View style={{
                flex: 1
            }}>
                <ScrollView
                    contentContainerStyle={{
                        ...styles.scrollView,
                        flexGrow: 1
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        filteredEvents?.length > 0
                            ?
                            filteredEvents.map((evt) => (
                                // Reusing the EventCard component
                                <EventCard
                                    key={evt.id}
                                    event={evt}
                                    onPress={() => handleRequestPress({ event: evt })}
                                />
                            ))
                            :
                            <ZeroItems
                                zeroText={"No events found"}
                            />
                    }

                    {/* Add bottom spacing if needed */}
                    <View style={{ height: 20 }} />
                </ScrollView>
            </View>
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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
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
        gap: 24
    },
    tab: {
        // marginRight: 24,
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
        paddingVertical: 12,
    },
});